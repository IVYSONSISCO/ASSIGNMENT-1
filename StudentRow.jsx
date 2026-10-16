import StatusBadge from './StatusBadge.jsx';

/** One table row (desktop view). */
function StudentRow({ student, onEdit, onDelete }) {
  return (
    <tr>
      <td className="mono">{student.id}</td>
      <td>{student.fullName}</td>
      <td>{student.age}</td>
      <td className="email">{student.email}</td>
      <td>{student.course}</td>
      <td><StatusBadge enrolled={student.enrolled} /></td>
      <td className="actions">
        <button type="button" className="btn btn-small" onClick={() => onEdit(student.id)}
          aria-label={`Edit ${student.fullName}`}>Edit</button>
        <button type="button" className="btn btn-small btn-danger" onClick={() => onDelete(student.id)}
          aria-label={`Delete ${student.fullName}`}>Delete</button>
      </td>
    </tr>
  );
}

export default StudentRow;
