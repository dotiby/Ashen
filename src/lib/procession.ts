type Light = {
  x: number;
  y: number;
  born: number;
  seed: number;
};

const MAX_DPR = 2.5;

/**
 * Light overlay for the Ashen artwork.
 * The painting itself is the stage; this scene only adds warm lights and embers.
 */
export class ProcessionScene {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private onCountChange: (count: number) => void;
  private lights: Light[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private raf = 0;
  private reduced: boolean;
  private motionQuery: MediaQueryList;
  private observer: ResizeObserver;

  count = 0;

  constructor(canvas: HTMLCanvasElement, onCountChange: (count: number) => void) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas 2D is not supported in this browser.");
    }

    this.ctx = ctx;
    this.onCountChange = onCountChange;
    this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.reduced = this.motionQuery.matches;

    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(canvas);
    this.motionQuery.addEventListener("change", this.handleMotionChange);
    this.resize();
  }

  add(x: number, y: number) {
    if (!this.width || !this.height) {
      return;
    }

    const nx = Math.min(0.965, Math.max(0.035, x / this.width));
    const ny = Math.min(0.95, Math.max(0.05, y / this.height));
    this.addNormalized(nx, ny);
  }

  addAuto() {
    if (!this.width || !this.height) {
      return;
    }

    const nx = 0.16 + Math.random() * 0.68;
    const ny = 0.38 + Math.random() * 0.42;
    this.addNormalized(nx, ny);
  }

  clear() {
    this.lights = [];
    this.count = 0;
    this.onCountChange(0);
    this.stopLoop();
    this.render(performance.now());
  }

  destroy() {
    this.stopLoop();
    this.observer.disconnect();
    this.motionQuery.removeEventListener("change", this.handleMotionChange);
  }

  private handleMotionChange = (event: MediaQueryListEvent) => {
    this.reduced = event.matches;
    if (this.reduced) {
      this.stopLoop();
      this.render(performance.now());
    } else {
      this.startLoop();
    }
  };

  private addNormalized(x: number, y: number) {
    this.lights.push({
      x,
      y,
      born: performance.now(),
      seed: Math.random() * 1000,
    });

    this.count = this.lights.length;
    this.onCountChange(this.count);
    this.render(performance.now());
    this.startLoop();
  }

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    this.width = rect.width;
    this.height = rect.height;
    this.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.render(performance.now());
  }

  private startLoop() {
    if (this.reduced || this.raf || this.lights.length === 0) {
      return;
    }

    const tick = (now: number) => {
      this.render(now);
      this.raf =
        this.lights.length > 0 && !this.reduced
          ? window.requestAnimationFrame(tick)
          : 0;
    };

    this.raf = window.requestAnimationFrame(tick);
  }

  private stopLoop() {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  private render(now: number) {
    const { ctx, width, height } = this;

    ctx.clearRect(0, 0, width, height);

    if (!width || !height || this.lights.length === 0) {
      return;
    }

    const unit = Math.min(width / 500, 1.3);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    for (const light of this.lights) {
      this.drawLight(light, now, unit);
    }

    const floorGlow = ctx.createLinearGradient(0, height * 0.72, 0, height);
    floorGlow.addColorStop(0, "rgba(255, 176, 70, 0)");
    floorGlow.addColorStop(1, "rgba(255, 166, 62, 0.08)");
    ctx.fillStyle = floorGlow;
    ctx.fillRect(0, height * 0.72, width, height * 0.28);

    ctx.restore();
  }

  private drawLight(light: Light, now: number, unit: number) {
    const { ctx, width, height } = this;
    const x = light.x * width;
    const y = light.y * height;
    const pulse = this.reduced ? 1 : 0.86 + Math.sin(now * 0.0014 + light.seed) * 0.14;
    const radius = 38 * unit * pulse;

    const halo = ctx.createRadialGradient(x, y, 0, x, y, radius);
    halo.addColorStop(0, `rgba(255, 236, 190, ${0.72 * pulse})`);
    halo.addColorStop(0.18, `rgba(255, 194, 104, ${0.46 * pulse})`);
    halo.addColorStop(0.52, `rgba(244, 142, 40, ${0.17 * pulse})`);
    halo.addColorStop(1, "rgba(214, 96, 16, 0)");

    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 248, 224, 0.95)";
    ctx.beginPath();
    ctx.arc(x, y, 2.6 * unit, 0, Math.PI * 2);
    ctx.fill();

    if (!this.reduced) {
      const age = now - light.born;
      if (age < 1100) {
        const progress = age / 1100;
        ctx.strokeStyle = `rgba(255, 198, 112, ${0.4 * (1 - progress)})`;
        ctx.lineWidth = 1.2 * unit;
        ctx.beginPath();
        ctx.arc(x, y, (8 + progress * 46) * unit, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 6; i += 1) {
        const cycle = (now * 0.00013 + light.seed * 0.01 + i / 6) % 1;
        const rise = cycle * 74 * unit;
        const sway = Math.sin(now * 0.0007 + light.seed + i * 1.7) * 7 * unit;
        const alpha = Math.sin(cycle * Math.PI) * 0.55;
        const size = (1.5 - cycle * 0.6) * unit;

        ctx.fillStyle = `rgba(255, 187, 92, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x + sway, y - 10 * unit - rise, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
