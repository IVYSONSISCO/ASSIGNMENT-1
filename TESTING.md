# Manual Test Plan

| # | Test | Steps | Expected Result | Result |
|---|---|---|---|---|
| 1 | Add student (valid) | Click "Add Student", enter "Jane Doe", 21, jane@uni.ac.za, choose a course, click Add Student | Modal closes, new row with next ID (e.g. STU-007) appears, total count increases | Pass |
| 2 | Add student (invalid, empty) | Open Add modal, click Add Student with all fields empty | Error under name, age, email and course; nothing saved | Pass |
| 3 | Name rule | Enter "A" as name and submit | "Full name must be at least 2 characters." | Pass |
| 4 | Age required | Leave age empty, submit | "Age is required." | Pass |
| 5 | Age range | Enter 15, then 101, submit | "Age must be between 16 and 100." | Pass |
| 6 | Age whole number | Enter 20.5, submit | "Age must be a whole number." | Pass |
| 7 | Email required | Leave email empty, submit | "Email is required." | Pass |
| 8 | Email format | Enter "jane@uni", submit | "Please enter a valid email address…" | Pass |
| 9 | Duplicate email | Enter thabo.mokoena@uni.ac.za for a new student | "This email is already used by another student." | Pass |
| 10 | Course required | Leave course on "-- Select a course --", submit | "Please select a course." | Pass |
| 11 | Error clears while fixing | Trigger name error, then type a valid name | Error message disappears as you type | Pass |
| 12 | Edit student | Click Edit on STU-002, change age to 23, Save Changes | Form was pre-filled; row now shows 23; ID unchanged | Pass |
| 13 | Edit keeps own email | Edit a student without changing email, save | Saves with no duplicate-email error | Pass |
| 14 | Delete student | Click Delete on a student, click Confirm Delete | Modal shows correct name; student removed; count decreases | Pass |
| 15 | Cancel Add modal | Open Add, type something, click Cancel | Modal closes, nothing saved; reopening shows empty form | Pass |
| 16 | Cancel Edit modal | Open Edit, change a value, click Cancel | Modal closes, original data unchanged | Pass |
| 17 | Cancel Delete modal | Open Delete, click Cancel | Modal closes, student still listed | Pass |
| 18 | Close via X / overlay / Escape | Open each modal; close with X, then by clicking the dark overlay, then with Escape | Modal closes every time, no changes saved | Pass |
| 19 | Search | Type "lera" in search | Only Lerato Nkosi shown | Pass |
| 20 | Status filter | Choose "Not Enrolled" | Only students with grey "Not Enrolled" badge shown | Pass |
| 21 | Empty state | Delete all students | "No students yet" message with Add Student button | Pass |
| 22 | Persistence | Add/edit a student, refresh the page | Changes are still there | Pass |
| 23 | Mobile layout | Narrow the browser below 760px (or use DevTools device mode) | Table hidden, cards shown, all buttons usable | Pass |
| 24 | Keyboard | Use Tab to reach buttons/inputs, Enter to submit, Esc to close | Focus outline visible; everything works without a mouse | Pass |

> Tip: to restore the 6 sample students, open DevTools → Application → Local Storage and delete the `sms-students` key, then refresh.
