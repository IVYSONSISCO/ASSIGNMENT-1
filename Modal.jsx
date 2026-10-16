import { useEffect, useRef } from 'react';

/**
 * Generic, reusable modal wrapper. Handles everything every modal needs:
 *  - closes on the X button, overlay click and Escape key
 *  - accessibility: role="dialog", aria-modal, aria-labelledby
 *  - moves keyboard focus into the dialog, and back again on close
 * The content is passed in as `children`.
 */
function Modal({ isOpen, title, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return; // nothing to set up while closed

    const previouslyFocused = document.activeElement;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    // Focus the first input/button inside the dialog for keyboard users.
    const firstFocusable = dialogRef.current?.querySelector('input, select, button:not(.modal-close)');
    firstFocusable?.focus();

    // Cleanup runs when the modal closes: remove listener, restore focus.
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // early return: render nothing when closed

  // Only close when the click is on the overlay itself, not inside the box.
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onMouseDown={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={dialogRef}>
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
