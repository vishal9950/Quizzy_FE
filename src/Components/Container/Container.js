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
      answered: [],
      ctr: 0,
    };
    this.getUsers();
  }

  onChangeHandler1 = (event, quesid) => {
    console.log(`here ${event.target.value} ${quesid}`);
    let i;
    for (i = 0; i < this.state.ques.length; i += 1) {
      if (this.state.ques[i].quesid === quesid) {
        break;
      }
    }
    console.log(`i: igi ${i}`);
    let flag = 0;
    let j;
    for (j = 0; j < this.state.answered.length; j += 1) {
      console.log('inside for');
      if (this.state.answered[j].quesid === quesid && this.state.answered[j].rt === true) {
        flag = 1;
        break;
      } else if (this.state.answered[j].quesid === quesid && this.state.answered[j].rt !== true) {
        flag = 2;
        break;
      }
    }
    console.log(`j: kjbkhb: ${j}`);
    if (event.target.value === this.state.ques[i].correctans) {
      console.log('here1');
      if (j !== this.state.answered.length && flag === 2) {
        console.log('here2');
        const temp = this.state.answered;
        temp[j].rt = true;
        temp[j].option = event.target.value;
        const options = {
          url: '/users',
          method: 'POST',
          data: {
            username: this.state.username,
            score: this.state.score + 1,
          },
        };
        axios(options).then(() => {
          console.log('Score saved!');
          this.setState({
            answered: temp,
            score: this.state.score + 1,
          });
        });
      } else if (j !== this.state.answered.length && flag === 1) {
        console.log('here3');
        this.setState({
          ctr: this.state.ctr + 1,
        });
      } else if (j === this.state.answered.length) {
        console.log('here4');
        const options = {
          url: '/users',
          method: 'POST',
          data: {
            username: this.state.username,
            score: this.state.score + 1,
          },
        };
        axios(options).then(() => {
          console.log('Score saved!');
          this.setState({
            answered: this.state.answered.concat({
              quesid,
              rt: true,
              option: event.target.value,
            }),
            score: this.state.score + 1,
          });
        });
      }
    }
    if (event.target.value !== this.state.ques[i].correctans) {
      console.log(`here5: j: ${j}`);
      if (j !== this.state.answered.length && flag === 2) {
        console.log('here6');
        this.setState({
          ctr: this.state.ctr,
        });
      } else if (j !== this.state.answered.length && flag === 1) {
        console.log('here7');
        const temp = this.state.answered;
        temp[j].rt = false;
        temp[j].option = event.target.value;
        const options = {
          url: '/users',
          method: 'POST',
          data: {
            username: this.state.username,
            score: this.state.score - 1,
          },
        };
        axios(options).then(() => {
          console.log('Score saved!');
          this.setState({
            answered: temp,
            score: this.state.score - 1,
          });
        });
      } else if (j === this.state.answered.length) {
        console.log('here8');
        this.setState({
          answered: this.state.answered.concat({
            quesid,
            rt: false,
            option: event.target.value,
          }),
        });
      }
    }
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
          score={this.state.score}
          onChange={(event, quesid) => this.onChangeHandler1(event, quesid)}
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
