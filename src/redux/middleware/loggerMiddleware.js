import { assign, reduce } from 'lodash';
import createLogger from 'redux-logger';

export default createLogger({
  duration: true,
  timestamp: true,
  colors: {
    title: (action) => {
      const rgb = reduce(action.type.split('/')[0], (acc, char, index) => {
        return assign(acc, { [index % 3]: (acc[index % 3] + char.charCodeAt(0)) % 200 });
      }, [70, 30, 20]);

      return reduce(rgb, (acc, v) => {
        return acc + `0${v.toString(16)}`.slice(-2);
      }, '#');
    },
  },
  collapsed: true,
  predicate: () => __DEV__,
  titleFormatter: (action, time, took) => `action: ${action.type} (${took.toFixed(2)} ms)`,
  diff: true,
});
