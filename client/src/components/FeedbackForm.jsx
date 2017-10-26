import React, { Component } from 'react';

class FeedbackForm extends Component {
  constructor() {
    super();
    this.state = {
      fname: '',
      lname: '',
      email: '',
      feedback: '',
      formSent: false
    };
  }

  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch('/submitfeedback', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        fname: this.state.fname,
        lname: this.state.lname,
        feedback: this.state.feedback
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        this.setState({formSent: true})
      }
      else this.setState({formSent: false})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const { fname, lname, email, feedback, formSent } = this.state;
    return (
      <form
        className="feedback-form"
        onSubmit={this.handleSubmit}
      >
        <p className="feedback-line">First Name:</p>
        <input
          className="feedback-line"
          type="text"
          name="fname"
          value={fname}
          onChange={this.onChange}
        />
      <p className="feedback-line">Last Name:</p>
        <input
          className="feedback-line"
          type="text"
          name="lname"
          value={lname}
          onChange={this.onChange}
        />
      <p className="feedback-line">Email address:</p>
        <input
          className="feedback-line"
          type="text"
          name="email"
          value={email}
          onChange={this.onChange}
        />
        <p className="feedback-line">Feedback:</p>
        <input
          className="feedback-line"
          type="text"
          name="feedback"
          value={feedback}
          onChange={this.onChange}
        />
        <input
          className="feedback-submit feedback-line"
          name="submit-feedback"
          type="submit"
          id="submit-feedback"
          value="Send Feedback"
        />
      </form>
    );
  }
}

export default FeedbackForm;
