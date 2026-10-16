import Modal from './Modal.jsx';

/** Asks the user to confirm before a student is permanently removed. */
function DeleteConfirmModal({ isOpen, student, onConfirm, onClose }) {
  return (
    <Modal isOpen={isOpen} title="Delete student" onClose={onClose}>
      <p>
        Are you sure you want to delete{' '}
        <strong>{student ? student.fullName : 'this student'}</strong>? This cannot be undone.
      </p>
      <div className="modal-actions">
        <button type="button" className="btn" onClick={onClose}>Cancel</button>
        <button type="button" className="btn btn-danger-solid" onClick={onConfirm}>Confirm Delete</button>
      </div>
    </Modal>
  );
}

export default DeleteConfirmModal;
