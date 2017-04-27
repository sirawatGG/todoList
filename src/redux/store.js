import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate } from 'redux-persist';
import middleware from './middleware';
import reducer from './modules/reducer';

const store = createStore(
  reducer,
  undefined,
  compose(applyMiddleware(...middleware), autoRehydrate()),
);

export default store;
