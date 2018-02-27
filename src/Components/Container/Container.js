import React from 'react';
import './Container.css';
import LoginCard from '../LoginCard/LoginCard';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  onChangeHandler = (event) => {
    this.setState({
      username: `${event.target.value}`,
    });
  }

  render() {
    return (
      <div className="Container-contain">
        <LoginCard onChange={event => this.onChangeHandler(event)} username={this.state.username} />
      </div>
    );
  }
}

export default Container;
