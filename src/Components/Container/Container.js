import React from 'react';
import axios from 'axios';
import './Container.css';
import LoginCard from '../LoginCard/LoginCard';
import QuestionCard from '../QuestionCard/QuestionCard';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      page: 1,
      users: [],
      //   state: [],
      score: 0,
      ques: [],
    };
    this.getUsers();
  }

  onChangeHandler = (event) => {
    this.setState({
      username: `${event.target.value}`,
    });
  }

  onClickHandler = () => {
    // axios.post('/users').then((allUsers) => {
    //   console.log(allUsers);
    let flag = 0;
    for (let i = 0; i < this.state.users.length; i += 1) {
      if (this.state.users[i].username === this.state.username) {
        flag = 1;
        break;
      }
    }
    if (flag === 1) {
      console.log('no');
      // axios.get('/state').then((state) => {

      // })
    } else {
      const options = {
        url: '/users',
        method: 'POST',
        data: {
          username: this.state.username,
          score: this.state.score,
        },
      };
      axios(options).then(() => {
        console.log('User created!');
      });
      this.setState({
        //   users: this.state.users.push(allUsers.data),
        page: 2,
      });
    }
    // });
  }

  getUsers = () => {
    axios.get('/users').then((allUsers) => {
      axios.post('/ques').then(() => {
        axios.get('/ques').then((allQues) => {
          this.setState({
            users: allUsers.data,
            ques: allQues.data,
          });
        });
      });
    });
  }

  render() {
    if (this.state.page === 1) {
      return (
        <div className="Container-contain">
          <LoginCard
            onClick={() => this.onClickHandler()}
            onChange={event => this.onChangeHandler(event)}
            username={this.state.username}
          />
        </div>
      );
    } else if (this.state.page === 2) {
      const rows = [];
      for (let i = 0; i < this.state.ques.length; i += 1) {
        rows.push(<QuestionCard
          username={this.state.username}
          ques={this.state.ques[i]}
        />);
      }
      return (
        <div className="Container-ques">
          {rows}
        </div>
      );
    }
    return (
      <div>PAGE 3</div>
    );
  }
}

export default Container;
