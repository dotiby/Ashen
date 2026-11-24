import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { TOKEN } from "../config";

const ADVICES = [
  "Compound interest rewards patience.",
  "Never invest more than you can lose.",
  "Diversify before you anticipate.",
  "Time in the market beats timing it.",
  "Small fees quietly eat large returns.",
  "Write your plan before you trade.",
  "Protect your downside first.",
  "Small, steady contributions win.",
  "Read the whitepaper twice.",
  "Testnet gains are still just practice.",
];

const START = { x: 0.13, y: 0.8 };
const THRONE = { x: 0.79, y: 0.82 };

type Direction = "left" | "right" | "up" | "down";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function ThroneGame() {
  const stageRef = useRef<HTMLDivElement>(null);
  const actorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ ...START, vx: 0, vy: 0 });
  const keysRef = useRef<Record<Direction, boolean>>({
    left: false,
    right: false,
    up: false,
    down: false,
  });
  const startedRef = useRef(false);
  const seatedRef = useRef(false);
  const lastTimeRef = useRef(0);
  const lastAdviceRef = useRef(-1);

  const [started, setStarted] = useState(false);
  const [seated, setSeated] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const setKey = useCallback((direction: Direction, pressed: boolean) => {
    keysRef.current[direction] = pressed;
  }, []);

  const pickAdvice = useCallback(() => {
    let index = Math.floor(Math.random() * ADVICES.length);
    if (index === lastAdviceRef.current) {
      index = (index + 1) % ADVICES.length;
    }
    lastAdviceRef.current = index;
    return ADVICES[index];
  }, []);

  const reset = useCallback(() => {
    positionRef.current = { ...START, vx: 0, vy: 0 };
    seatedRef.current = false;
    keysRef.current = { left: false, right: false, up: false, down: false };
    setSeated(false);
    setAdvice(null);
    setStarted(true);
    startedRef.current = true;
    stageRef.current?.focus();
  }, []);

  useEffect(() => {
    let frame = 0;

    const tick = (now: number) => {
      const stage = stageRef.current;
      const actor = actorRef.current;

      if (stage && actor) {
        const rect = stage.getBoundingClientRect();
        const position = positionRef.current;
        const keys = keysRef.current;
        const elapsed = lastTimeRef.current
          ? Math.min(now - lastTimeRef.current, 150)
          : 16;
        lastTimeRef.current = now;
        const dt = elapsed / 1000;

        let axisX = 0;
        let axisY = 0;
        if (keys.left) axisX -= 1;
        if (keys.right) axisX += 1;
        if (keys.up) axisY -= 1;
        if (keys.down) axisY += 1;

        if (axisX && axisY) {
          axisX *= Math.SQRT1_2;
          axisY *= Math.SQRT1_2;
        }

        const canMove = startedRef.current && !seatedRef.current;
        const speed = 0.46;
        const smoothing = Math.min(1, 10 * dt);
        const targetVx = canMove ? axisX * speed : 0;
        const targetVy = canMove ? axisY * speed * 0.55 : 0;

        position.vx += (targetVx - position.vx) * smoothing;
        position.vy += (targetVy - position.vy) * smoothing;
        position.x = clamp(position.x + position.vx * dt, 0.07, 0.91);
        position.y = clamp(position.y + position.vy * dt, 0.58, 0.85);

        if (
          canMove &&
          Math.hypot(position.x - THRONE.x, (position.y - THRONE.y) * 0.6) < 0.075
        ) {
          seatedRef.current = true;
          position.x = THRONE.x - 0.01;
          position.y = THRONE.y;
          position.vx = 0;
          position.vy = 0;
          setAdvice(pickAdvice());
          setSeated(true);
        }

        actor.style.transform = `translate3d(${position.x * rect.width}px, ${position.y * rect.height}px, 0)`;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [pickAdvice]);

  useEffect(() => {
    const keyMap: Record<string, Direction> = {
      arrowleft: "left",
      a: "left",
      arrowright: "right",
      d: "right",
      arrowup: "up",
      w: "up",
      arrowdown: "down",
      s: "down",
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!startedRef.current || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const direction = keyMap[event.key.toLowerCase()];
      if (!direction) {
        return;
      }

      event.preventDefault();
      setKey(direction, true);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const direction = keyMap[event.key.toLowerCase()];
      if (direction) {
        setKey(direction, false);
      }
    };

    const onBlur = () => {
      keysRef.current = { left: false, right: false, up: false, down: false };
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [setKey]);

  const status = !started
    ? "Waiting to start"
    : seated
      ? "Seated · advice received"
      : "Guide the figure to the throne";

  return (
    <section
      className="section procession"
      id="procession"
      aria-labelledby="procession-title"
    >
      <div className="container">
        <div className="procession__grid">
          <div className="procession__copy">
            <p className="eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              Interactive · Local session
            </p>
            <h2 id="procession-title">Take the throne.</h2>
            <p className="section-lead">
              Guide the hooded figure through the procession to the seat. Reach the throne
              and a short piece of advice appears above the figure.
            </p>

            <div className="game__panel">
              <div className="game__status" aria-live="polite">
                <span className="game__status-dot" aria-hidden="true" />
                {status}
              </div>

              {!started || seated ? (
                <button type="button" className="button button--ink game__start" onClick={reset}>
                  {seated ? "Play again" : "Start the journey"}
                  <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                </button>
              ) : null}

              <div className="game__pad" aria-label="Movement controls">
                <button
                  type="button"
                  className="game__pad-button"
                  aria-label="Move left"
                  onPointerDown={() => setKey("left", true)}
                  onPointerUp={() => setKey("left", false)}
                  onPointerLeave={() => setKey("left", false)}
                  onPointerCancel={() => setKey("left", false)}
                >
                  <ArrowLeft size={20} strokeWidth={2} aria-hidden="true" />
                </button>
                <span className="game__pad-track" aria-hidden="true">
                  <span className="game__pad-knob" />
                </span>
                <button
                  type="button"
                  className="game__pad-button"
                  aria-label="Move right"
                  onPointerDown={() => setKey("right", true)}
                  onPointerUp={() => setKey("right", false)}
                  onPointerLeave={() => setKey("right", false)}
                  onPointerCancel={() => setKey("right", false)}
                >
                  <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>

              {started ? (
                <button type="button" className="game__reset" onClick={reset}>
                  <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
                  Restart
                </button>
              ) : null}
            </div>
          </div>

          <div
            className="game__stage"
            ref={stageRef}
            tabIndex={0}
            role="group"
            aria-label="Throne game area"
            aria-describedby="game-help"
          >
            <img
              className="game__backdrop"
              src={TOKEN.logo}
              alt="Ashen artwork showing the hooded figure and the procession."
              width={507}
              height={571}
            />

            <div className="game__throne" aria-hidden="true">
              <svg viewBox="0 0 140 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 182V74C18 36 40 14 70 8C100 14 122 36 122 74V182"
                  fill="#24150b"
                  stroke="#c97a17"
                  strokeWidth="5"
                />
                <path
                  d="M33 180V80C33 52 48 34 70 26C92 34 107 52 107 80V180"
                  fill="#3a2413"
                  stroke="#eda63a"
                  strokeWidth="2"
                />
                <path d="M70 10V0" stroke="#f8c266" strokeWidth="3" />
                <rect
                  x="26"
                  y="118"
                  width="88"
                  height="20"
                  rx="9"
                  fill="#5a2c14"
                  stroke="#eda63a"
                  strokeWidth="2"
                />
                <path
                  d="M31 140L25 182M109 140L115 182"
                  stroke="#c97a17"
                  strokeWidth="7"
                />
              </svg>
            </div>

            <div
              className={seated ? "game__actor game__actor--seated" : "game__actor"}
              ref={actorRef}
            >
              {advice ? (
                <div className="game__bubble" role="status">
                  {advice}
                </div>
              ) : null}

              <svg
                className="game__sprite"
                viewBox="0 0 160 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id="ashen-character-clip">
                    <path d="M80 8C101 8 114 23 114 45C114 59 106 71 98 79C120 89 134 113 140 151L145 216H112C108 181 99 162 80 162C61 162 52 181 48 216H15L20 151C26 113 40 89 62 79C54 71 46 59 46 45C46 23 59 8 80 8Z" />
                  </clipPath>
                </defs>
                <path
                  d="M80 8C101 8 114 23 114 45C114 59 106 71 98 79C120 89 134 113 140 151L145 216H112C108 181 99 162 80 162C61 162 52 181 48 216H15L20 151C26 113 40 89 62 79C54 71 46 59 46 45C46 23 59 8 80 8Z"
                  fill="rgba(24, 14, 7, 0.82)"
                />
                <image
                  href={TOKEN.logo}
                  x="-30"
                  y="-23"
                  width="228"
                  height="257"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#ashen-character-clip)"
                />
                <path
                  d="M80 8C101 8 114 23 114 45C114 59 106 71 98 79C120 89 134 113 140 151L145 216H112C108 181 99 162 80 162C61 162 52 181 48 216H15L20 151C26 113 40 89 62 79C54 71 46 59 46 45C46 23 59 8 80 8Z"
                  fill="none"
                  stroke="#f8c266"
                  strokeWidth="1.6"
                  strokeOpacity="0.9"
                />
              </svg>
            </div>

            <span className="game__stage-tag" aria-hidden="true">
              ASHN · GIWA SEPOLIA
            </span>
          </div>
        </div>

        <div className="stage-meta">
          <p id="game-help" className="stage-help">
            Use <kbd>←</kbd> <kbd>→</kbd> or <kbd>A</kbd> <kbd>D</kbd> to move, and{" "}
            <kbd>↑</kbd> <kbd>↓</kbd> for a little lift. On touch, use the on-screen pad.
            Nothing leaves this device.
          </p>
          <p className="stage-tag">No wallet required</p>
        </div>
      </div>
    </section>
  );
}
