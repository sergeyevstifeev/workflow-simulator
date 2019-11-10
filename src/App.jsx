import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { prop, propOr, sortBy } from 'ramda';
import './App.css';

function AppComponent(props) {
  const { lanes, time } = props;
  return (
    <div className="App">
      <div className="control-panel">
        <div className="timer">{`Time: ${time}`}</div>
        <button type="button" className="pause-button" onClick={() => props.dispatch({ type: 'PAUSE_CLICK' })}>Pause</button>
      </div>
      <div className="lanes">
        {
            sortBy(prop('order'), Object.keys(lanes)).map((laneId) => {
              const laneData = prop(laneId, lanes);
              return (
                <div className="lane">
                  <div className="lane-header">{laneId}</div>
                  <div>{propOr([], 'tasks', laneData).map((task) => <div className="task">{task}</div>)}</div>
                </div>
              );
            })
          }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lanes: state.lanes,
  time: state.time,
});

const App = connect(
  mapStateToProps,
)(AppComponent);

AppComponent.propTypes = {
  lanes: PropTypes.objectOf(PropTypes.any).isRequired,
  time: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default App;
