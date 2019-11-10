import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

function AppComponent(props) {
  const { lanes, time } = props;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {`Lanes state: ${JSON.stringify(lanes)}`}
        </p>
        <p>
          {`Time: ${time}`}
        </p>
      </header>
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
  lanes: PropTypes.arrayOf(PropTypes.any).isRequired,
  time: PropTypes.number.isRequired,
};

export default App;
