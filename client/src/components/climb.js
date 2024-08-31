import { Link } from 'react-router-dom';
import '../css/climbCard.css';

// functional component for rendering climb card
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
      <div className="card-text">
        <span><b>Grade: </b>V{climb.grade}</span>
        <span><b>Attempts: </b>{climb.attempts}</span>
        <span><b>Date: </b>{climb.date.substring(0, 10)}</span>
      </div>
      <div className="d-flex justify-content-between ms-auto">
        <Link to={"edit/" + climb._id} className="btn btn-primary">Edit</Link>
        <button onClick={() => { deleteClimb(climb._id) }} className="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
)

export default Climb;