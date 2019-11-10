import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import random from 'random';
import tick from './effects/tick';
import './index.css';
import App from './App';

const buildInitialState = () => ({
  time: 0,
  paused: false,
  nextTask: 8,
  modelParams: {
    avgNewTasks: 2,
  },
  lanes: {
    backlog: {
      tasks: ['task1'],
      order: 1,
    },
    todo: {
      tasks: ['task2', 'task3'],
      order: 2,
    },
    inProgress: {
      tasks: ['task4', 'task5', 'task6'],
      order: 3,
    },
    done: {
      tasks: ['task7'],
      order: 4,
    },
  },
});

const nextState = (state) => {
  let { nextTask } = state;
  const { lanes: { backlog } } = state;
  const numberOfNewTasks = random.poisson(state.modelParams.avgNewTasks)();
  [...Array(numberOfNewTasks)].forEach((_, i) => {
    backlog.tasks.push(`task${i + nextTask}`);
    nextTask += 1;
  });

  return {
    ...state,
    nextTask,
    lanes: {
      ...state.lanes,
      backlog,
    },
    time: state.time + 1,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TICK': {
      if (!state.paused) {
        return nextState(state);
      }
      return state;
    }
    case 'PAUSE_CLICK': {
      return { ...state, paused: !state.paused };
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
