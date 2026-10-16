import StatusBadge from './StatusBadge.jsx';

/** One student card (mobile view). Same data and actions as StudentRow. */
function StudentCard({ student, onEdit, onDelete }) {
  return (
    <li className="card">
      <div className="card-top">
        <span className="mono">{student.id}</span>
        <StatusBadge enrolled={student.enrolled} />
      </div>
      <h2 className="card-name">{student.fullName}</h2>
      <dl className="card-details">
        <dt>Age</dt><dd>{student.age}</dd>
        <dt>Email</dt><dd className="email">{student.email}</dd>
        <dt>Course</dt><dd>{student.course}</dd>
      </dl>
      <div className="actions">
        <button type="button" className="btn btn-small" onClick={() => onEdit(student.id)}
          aria-label={`Edit ${student.fullName}`}>Edit</button>
        <button type="button" className="btn btn-small btn-danger" onClick={() => onDelete(student.id)}
          aria-label={`Delete ${student.fullName}`}>Delete</button>
      </div>
    </li>
  );
}

export default StudentCard;
