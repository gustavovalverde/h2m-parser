/**
 * Lightweight progress bar implementation for benchmarks
 * No external dependencies, uses only Node.js built-ins
 */

export class ProgressBar {
  constructor(total, options = {}) {
    this.total = total;
    this.current = 0;
    this.startTime = Date.now();
    this.width = options.width || 40;
    this.complete = options.complete || "█";
    this.incomplete = options.incomplete || "░";
    this.format =
      options.format || ":bar :percent (:current/:total) :elapseds elapsed, ~:etas remaining";
    this.renderThrottle = options.renderThrottle || 100;
    this.lastRender = 0;
    this.stream = process.stdout;
    this.isEnabled = this.stream.isTTY && !process.env.CI;
  }

  tick(delta = 1) {
    this.current = Math.min(this.current + delta, this.total);
    const now = Date.now();

    // Throttle rendering
    if (now - this.lastRender < this.renderThrottle && this.current < this.total) {
      return;
    }

    this.lastRender = now;
    this.render();
  }

  render() {
    if (!this.isEnabled) {
      return;
    }

    const elapsed = Date.now() - this.startTime;
    const percent = Math.min(100, Math.floor((this.current / this.total) * 100));
    const filled = Math.floor(this.width * (this.current / this.total));
    const empty = this.width - filled;

    const bar = this.complete.repeat(filled) + this.incomplete.repeat(empty);

    // Calculate ETA
    let eta = 0;
    if (this.current > 0) {
      const rate = this.current / elapsed;
      eta = (this.total - this.current) / rate;
    }

    // Format the output
    const output = this.format
      .replace(":bar", bar)
      .replace(":percent", `${percent}%`)
      .replace(":current", this.current.toString())
      .replace(":total", this.total.toString())
      .replace(":elapseds", this.formatTime(elapsed))
      .replace(":etas", this.formatTime(eta));

    // Clear line and write progress
    this.stream.clearLine(0);
    this.stream.cursorTo(0);
    this.stream.write(`[bench] ${output}`);

    // If complete, add newline
    if (this.current >= this.total) {
      this.stream.write("\n");
    }
  }

  formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m${remainingSeconds}s`;
  }

  terminate() {
    if (this.isEnabled && this.current < this.total) {
      this.stream.clearLine(0);
      this.stream.cursorTo(0);
    }
  }
}

/**
 * Simple spinner for indeterminate progress
 */
export class Spinner {
  constructor(text = "Processing...") {
    this.text = text;
    this.frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    this.currentFrame = 0;
    this.interval = null;
    this.stream = process.stdout;
    this.isEnabled = this.stream.isTTY && !process.env.CI;
  }

  start() {
    if (!this.isEnabled) {
      console.log(`[bench] ${this.text}`);
      return;
    }

    this.interval = setInterval(() => {
      this.stream.clearLine(0);
      this.stream.cursorTo(0);
      const frame = this.frames[this.currentFrame];
      this.stream.write(`[bench] ${frame} ${this.text}`);
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }, 80);
  }

  stop(message) {
    if (!this.isEnabled) {
      if (message) {
        console.log(`[bench] ${message}`);
      }
      return;
    }

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.stream.clearLine(0);
      this.stream.cursorTo(0);
      if (message) {
        this.stream.write(`[bench] ${message}\n`);
      }
    }
  }
}
