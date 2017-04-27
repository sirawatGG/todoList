import api from '../../helpers/api';

export default function apiMiddleware({ dispatch, getState }) {
  return (next) => {
    return async (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { types, apiOptions, ...rest } = action;

      if (!apiOptions) {
        return next(action);
      }

      try {
        const response = await api(apiOptions);
        const { status } = response;
        const result = await response.json();

        if (status === 200) {
          next({ ...rest, result, type: types[0] });

          return Promise.resolve(result);
        }

        next({ ...rest, error: result, type: types[1] });

        return Promise.reject(result);
      } catch (error) {

        next({ ...rest, error, type: types[1] });

        return Promise.reject(error);
      }
    };
  };
}
