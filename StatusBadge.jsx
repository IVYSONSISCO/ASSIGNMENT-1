import { getStatusLabel } from '../utils/studentHelpers.js';

/** Small reusable badge: green for enrolled, grey for not enrolled. */
function StatusBadge({ enrolled }) {
  return (
    <span className={enrolled ? 'badge badge-success' : 'badge badge-muted'}>
      {getStatusLabel(enrolled)}
    </span>
  );
}

export default StatusBadge;
