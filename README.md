# Interactive Student Management System

A React application for managing student records: view, add, edit, search, filter and delete students. Data is saved in the browser with `localStorage`, so it survives a page refresh.

- **Live URL:** https://YOUR-PROJECT.vercel.app  *(replace after deploying)*
- **GitHub:** https://github.com/YOUR-USERNAME/student-management-system  *(replace after pushing)*

## Features
- Dashboard with a readable table on desktop and cards on mobile
- Total / enrolled / not-enrolled counts
- Add Student and Edit Student modals (one shared, reusable form)
- Delete confirmation modal showing the student's name
- Modals close with the X button, Cancel, clicking the overlay, or the Escape key, and reset when closed
- Field-level validation with clear messages that disappear as you fix them
- Duplicate email detection
- Search by name and filter by enrolment status
- Friendly empty state
- Instant UI updates (no page refresh) and persistence via `localStorage`
- Accessible: labelled inputs, `role="dialog"`, `aria-modal`, visible focus, keyboard support

## Tech Stack
- React 18 (functional components and hooks)
- Vite 5 (dev server and build tool)
- Plain JavaScript (ES2020+) and plain CSS
- Browser `localStorage`

## Installation and Running
Requires Node.js 18 or newer.
```bash
npm install      # install dependencies
npm run dev      # start dev server, open the URL shown (usually http://localhost:5173)
npm run build    # create a production build in /dist
npm run preview  # preview the production build locally
```

## Project Structure
```
student-management-system/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── TESTING.md
└── src/
    ├── main.jsx                  # mounts <App />
    ├── App.jsx                   # main state + handlers (lifted state)
    ├── components/
    │   ├── Header.jsx            # title, counts, Add button
    │   ├── StudentTable.jsx      # table (desktop) + card list (mobile)
    │   ├── StudentRow.jsx        # one table row
    │   ├── StudentCard.jsx       # one mobile card
    │   ├── StatusBadge.jsx       # Enrolled / Not Enrolled badge
    │   ├── StudentFormModal.jsx  # shared Add/Edit form
    │   ├── DeleteConfirmModal.jsx
    │   ├── Modal.jsx             # generic reusable modal wrapper
    │   └── EmptyState.jsx
    ├── utils/
    │   ├── validation.js         # validateField, validateStudent, isValid
    │   ├── studentHelpers.js     # add/update/delete/find/filter/generateStudentId
    │   └── variableDemo.js       # const / let / var demonstration
    ├── data/initialStudents.js   # 6 sample students + course list
    └── styles/
        ├── global.css
        └── app.css
```

## Data Types and Variable Declarations: Why I Chose Them

### Primitive types
| Field | Type | Why |
|---|---|---|
| `id` | string | Formatted labels like `"STU-001"` contain letters and leading zeros, which a number cannot hold. |
| `fullName` | string | Text. |
| `age` | number | Stored as a real `Number` so it can be compared (`age < 16`) and checked with `Number.isInteger`. Form inputs always return strings, so `toStudentObject()` converts it with `Number(...)`. |
| `email` | string | Text; stored lowercase so duplicate checks are case-insensitive. |
| `course` | string | One value from a fixed list (`COURSES`) used in the dropdown. |
| `enrolled` | boolean | Only two possible states, so `true`/`false` is the clearest and safest choice. It drives the status badge with a ternary. |

### Non-primitive types
- **Array of objects** (`students`): an ordered list that works naturally with `map`, `filter`, `find`, `some` and `reduce`.
- **Objects**: each student, the form values and the `errors` object (keys are field names, values are messages).

### Array methods used
- `map` — render rows/cards and update one student (`updateStudent`)
- `filter` — delete (`deleteStudent`) and search/filter (`filterStudents`)
- `find` — locate the selected student (`findStudentById`)
- `some` — detect a duplicate email (`validateField`)
- `reduce` — find the highest ID number (`generateStudentId`)

### const, let and var
- **`const`** is the default: imports, components, helper functions, `STORAGE_KEY`, `EMAIL_PATTERN`, and state from `useState` (we never reassign it; we call the setter instead).
- **`let`** is used only where a value really changes, e.g. the `count` counter and loop index `i` in `src/utils/variableDemo.js`, and `matchesStatus` in `filterStudents`.
- **`var`** appears **once**, in `variableDemo.js`, to show *function scope*: a `var` declared inside an `if` block is still visible after the block. This surprising behaviour is why modern code prefers `let`/`const`. The function is used for real in the Header's "enrolled" count.

## Testing
See [TESTING.md](./TESTING.md).
