import React from 'react';
import { PropTypes } from 'prop-types';
import './RadioButton.css';

class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    RadioButton.propTypes = {
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
    };
  }

  render() {
    const { onChange } = this.props;
    return (
      <div className="RadioButton-body">
        <input
          type="radio"
          name={this.props.name}
          value={this.props.value}
          onChange={(event) => { onChange(event); }}
        />
        <label>{this.props.value}</label>
      </div>
    );
  }
}

export default RadioButton;
