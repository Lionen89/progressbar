function progressBar(selector, delay) {
  this.progressbar = document.querySelector(selector);
  this.button = document.querySelector('.progressbar__button');
  this.step = 1;
  this.delay = delay;

  this._run = () => {
    this.timer = setInterval(this._go, this.delay);
    this.filler.style.transitionDuration = this.delay + 'ms';
    return this;
  };
  this._stop = () => {
    clearInterval(this.timer);
    this.timer = false;
    return this;
  };
  this.set = (val) => {
    val = parseInt(val);
    if (val >= 100) {
      val = 100;
      this._stop();
    }
    this.progressbar.dataset.progress = val;
    this.filler.style.width = val + '%';
    return this;
  };
  this._go = () => {
    this.set(this._getProgress() + this.step);
  };
  this.pause = () => {
    if (this.timer) this._stop();
    else this._run();
    return this;
  };
  this._reset = () => {
    this._stop().set(0);
    this._run();
    return this;
  };
  this._getProgress = () => {
    return parseInt(this.progressbar.dataset.progress) || 0;
  };
  this.filler = document.createElement('div');
  this.progressbar.appendChild(this.filler);
  this.button.addEventListener('click', () => {
    this._getProgress() === 100 ? this._reset() : this.pause();
  });
  this._run();
  return this;
}

p = new progressBar('.progressbar', 100);
