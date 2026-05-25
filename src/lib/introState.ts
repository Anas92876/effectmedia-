let _played = false;

export const introState = {
  get played() { return _played; },
  markDone() {
    _played = true;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('intro-done'));
    }
  },
};
