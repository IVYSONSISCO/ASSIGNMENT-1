/** Friendly message when there is nothing to show. The button is optional. */
function EmptyState({ title, message, onAddClick }) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-icon" aria-hidden="true">🎓</div>
      <h2>{title}</h2>
      <p>{message}</p>
      {/* && only renders the button when onAddClick was passed */}
      {onAddClick && (
        <button type="button" className="btn btn-primary" onClick={onAddClick}>+ Add Student</button>
      )}
    </div>
  );
}

export default EmptyState;
