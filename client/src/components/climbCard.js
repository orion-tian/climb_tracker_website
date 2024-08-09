import { Link } from 'react-router-dom';
import '../css/climbCard.css';

// functional component for rendering climb
const Climb = ({ climb, deleteClimb }) => (
  <div className="card">
    {climb.image && (
      <img
        src={'http://localhost:5000/' + climb.image}
        alt="climb"
        loading="lazy"
        className='card-image'
      />
    )}
    <div className='card-info'>
      <div className="card-title">{climb.description}</div>
      <div className="card-text">Grade: {climb.grade}</div>
      <div className="card-text"> Attempts: {climb.attempts}</div>
      <div className="card-date">Date: {climb.date.substring(0, 10)}</div>
      <Link to={"/edit/" + climb._id} className="btn btn-primary">Edit</Link>
      <button onClick={() => { deleteClimb(climb._id) }} className="btn btn-danger">Delete</button>
    </div>
  </div>
)

export default Climb;