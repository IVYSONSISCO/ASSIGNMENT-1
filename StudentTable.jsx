import StudentRow from './StudentRow.jsx';
import StudentCard from './StudentCard.jsx';

/**
 * Renders the list twice: as a <table> (shown on desktop) and as cards
 * (shown on mobile). CSS media queries decide which one is visible.
 * map() turns each student object into a component; `key` lets React track
 * each item efficiently between renders.
 */
function StudentTable({ students, onEdit, onDelete }) {
  return (
    <>
      <div className="table-wrap">
        <table className="student-table">
          <caption className="sr-only">List of students</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Full name</th>
              <th scope="col">Age</th>
              <th scope="col">Email</th>
              <th scope="col">Course</th>
              <th scope="col">Status</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentRow key={student.id} student={student} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>

      <ul className="card-list">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    </>
  );
}

export default StudentTable;
