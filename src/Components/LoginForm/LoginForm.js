import React from 'react';
import { PropTypes } from 'prop-types';
import './LoginForm.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    LoginForm.propTypes = {
      onChange: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired,
      username: PropTypes.string.isRequired,
    };
  }

  render() {
    const { onChange, onClick } = this.props;
    return (
      <div className="LoginForm-outer">
        <div className="LoginForm-text">Login</div>
        <div><label>Username</label></div>
        <div><input value={this.props.username} type="text" onChange={onChange} /></div>
        <div><button onClick={onClick}>Login</button></div>
      </div>
    );
  }
}

export default LoginForm;
