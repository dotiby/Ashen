import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { RotateCcw } from "lucide-react";
import { ProcessionScene } from "../lib/procession";
import { TokenLogo } from "./TokenLogo";

export function ProcessionBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ProcessionScene | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const scene = new ProcessionScene(canvas, setCount);
    sceneRef.current = scene;

    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const bounds = canvas.getBoundingClientRect();
    sceneRef.current?.add(event.clientX - bounds.left, event.clientY - bounds.top);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    sceneRef.current?.addAuto();
  };

  const handleRestart = () => {
    sceneRef.current?.clear();
  };

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
            <h2 id="procession-title">Build the procession.</h2>
            <p className="section-lead">
              Tap the painting to add a light. Each one joins the original procession.
              No wallet, no account, nothing saved.
            </p>

            <div className="procession__tools">
              <div className="light-counter" aria-live="polite" aria-atomic="true">
                <span className="light-counter__label">Lights placed</span>
                <span className="light-counter__value">
                  {String(count).padStart(2, "0")}
                </span>
              </div>
              <button
                type="button"
                className="button button--quiet"
                onClick={handleRestart}
                disabled={count === 0}
              >
                <RotateCcw size={16} strokeWidth={2} aria-hidden="true" />
                Restart
              </button>
            </div>
          </div>

          <div className="stage">
            <TokenLogo
              className="stage__art"
              alt="Ashen token artwork: a hooded figure standing before a burning procession."
            />
            <canvas
              ref={canvasRef}
              className="stage__canvas"
              role="button"
              tabIndex={0}
              aria-label="Add a light to the Ashen procession."
              aria-describedby="procession-help"
              aria-keyshortcuts="Enter Space"
              onClick={handleClick}
              onKeyDown={handleKeyDown}
            />
            {count === 0 ? (
              <div className="stage__hint" aria-hidden="true">
                <span className="stage__hint-dot" />
                <span>Tap to add a light</span>
              </div>
            ) : null}
            <div className="stage__grain" aria-hidden="true" />
          </div>
        </div>

        <div className="stage-meta">
          <p id="procession-help" className="stage-help">
            Click or tap anywhere on the painting to place a light. With the frame
            focused, press <kbd>Enter</kbd> or <kbd>Space</kbd>. Nothing leaves this
            device.
          </p>
          <p className="stage-tag">No wallet required</p>
        </div>
      </div>
    </section>
  );
}
