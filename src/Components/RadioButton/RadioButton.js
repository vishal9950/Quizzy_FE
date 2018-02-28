import React from 'react';
import { PropTypes } from 'prop-types';

class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    RadioButton.propTypes = {
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    };
  }

  render() {
    return (
      <div className="RadioButton-body">
        <input
          type="radio"
          name={this.props.name}
          value={this.props.value}
        />
        <label>{this.props.value}</label>
      </div>
    );
  }
}

export default RadioButton;
