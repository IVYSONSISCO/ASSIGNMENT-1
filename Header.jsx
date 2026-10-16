import { countEnrolledWithLoop } from '../utils/variableDemo.js';
import limkokwingLogo from '../assets/limkokwing-logo.png';

/**
 * Header: title, statistics and the "Add Student" button.
 * Props: students (array), onAddClick (function)
 */
function Header({ students, onAddClick }) {
  const total = students.length;
  // Uses the let/const/var demo utility to count enrolled students.
  const enrolled = countEnrolledWithLoop(students);

  return (
    <header className="header">
      <div className="container header-inner">
        <div>
          <img
            src={limkokwingLogo}
            alt="Limkokwing University of Creative Technology"
            className="logo"
          />
          <h1>Student Management System</h1>
          <p className="stats" aria-live="polite">
            <span><strong>{total}</strong> total {total === 1 ? 'student' : 'students'}</span>
            <span><strong>{enrolled}</strong> enrolled</span>
            <span><strong>{total - enrolled}</strong> not enrolled</span>
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={onAddClick}>
          + Add Student
        </button>
      </div>
    </header>
  );
}

export default Header;
