import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateClimb extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescrip = this.onChangeDescrip.bind(this);
    this.onChangeGrade = this.onChangeGrade.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      grade: -1,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    this.setState({
      users: ['test user'],
      username: 'test user'
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescrip(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeGrade(e) {
    this.setState({
      grade: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const climb = {
      username: this.state.username,
      description: this.state.description,
      grade: this.state.grade,
      date: this.state.date
    }

    console.log(climb);

    // take user back to home page
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Climb Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function (user) {
                  return <option
                    key={user}
                    value={user}>{user}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescrip}
            />
          </div>
          <div className="form-group">
            <label>Grade (V-Scale): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.grade}
              onChange={this.onChangeGrade}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
