import React from 'react';

type TimerRefType = {
  fn: any;
  timer?: NodeJS.Timeout;
};

export default function useDebounce(fn, delay, dep = []) {
  const {current} = React.useRef<TimerRefType>({fn, timer: undefined});
  React.useEffect(
    function () {
      current.fn = fn;
    },
    [fn],
  );

  return React.useCallback(function f(this: any, ...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
}
