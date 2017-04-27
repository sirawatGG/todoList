let timeoutInCase = {};
timeoutInCase = {};

export default {
  debounce: (func, wait, immediate, key) => {
    return () => {
      const context = this;
      const args = arguments;
      const callNow = immediate && !timeoutInCase[key];
      clearTimeout(timeoutInCase[key]);
      timeoutInCase[key] = setTimeout(() => {
        timeoutInCase[key] = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait);
      if (callNow) func.apply(context, args);
    };
  },
};
