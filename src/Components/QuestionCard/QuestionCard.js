import React from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import RadioButton from '../RadioButton/RadioButton';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    QuestionCard.propTypes = {
    //   username: PropTypes.string.isRequired,
      ques: PropTypes.object.isRequired,
    };
    this.getOptions();
  }

  getOptions = () => {
    axios.get(`/options/${this.props.ques.quesid}`).then((options) => {
      this.setState({
        options: options.data,
      });
    });
  }

  render() {
    const rows = [];
    for (let i = 0; i < this.state.options.length; i += 1) {
      rows.push(<RadioButton
        value={this.state.options[i].option}
        name={this.props.ques.ques}
      />);
    }
    console.log(rows);
    return (
      <div className="QuestionCard-outer">
        <div className="QuestionCard-ques">
          {this.props.ques.ques}
        </div>
        <div className="QuestionCard-options">
          {rows}
        </div>
      </div>
    );
  }
}

export default QuestionCard;

