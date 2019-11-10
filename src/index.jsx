import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import tick from './effects/tick';
import './index.css';
import App from './App';

const buildInitialState = () => ({
  time: 0,
  lanes: {
    lane1: ['task1'],
  },
});

const nextState = (state) => ({ ...state, time: state.time + 1 });

const reducer = (state, action) => {
  switch (action.type) {
    case 'TICK': {
      return nextState(state);
    }
    default: {
      return state;
    }
  }
};

const store = createStore(reducer, buildInitialState());

store.subscribe(tick(store));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
