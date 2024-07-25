import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Climb = props => (
  <tr>
    <td>{props.climb.username}</td>
    <td>{props.climb.description}</td>
    <td>{props.climb.grade}</td>
    <td>{props.climb.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.climb._id}>edit</Link> |
      <a href="#" onClick={() => { props.deleteClimb(props.climb._id) }}>delete</a>
    </td>
  </tr>
)

export default class ClimbsList extends Component {
  constructor(props) {
    super(props);

    this.deleteClimb = this.deleteClimb.bind(this);
    this.state = { climbs: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/climbs/')
      .then(response => {
        this.setState({ climbs: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteClimb(id) {
    axios.delete('http://localhost:5000/climbs/' + id)
      .then(res => console.log(res.data));
    this.setState({
      climbs: this.state.climbs.filter(el => el._id !== id)
    })
  }

  climbsList() {
    return this.state.climbs.map(currClimb => {
      return <Climb climb={currClimb} deleteClimb={this.deleteClimb} key={currClimb._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Climbs</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Grade</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.climbsList()}
          </tbody>
        </table>
      </div>
    )
  }
}