import React from 'react';
import './LoginGreet.css';

class LoginGreet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="LoginGreet-outer">
        <div className="LoginGreet-txt">Welcome</div>
        <div className="LoginGreet-txt">to</div>
        <div className="LoginGreet-main">Quizzy !</div>
      </div>
    );
  }
}

export default LoginGreet;
