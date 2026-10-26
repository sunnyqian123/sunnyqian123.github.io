# Concord Desk — classroom project guide

Concord Desk is a fictional real estate reception demo for Concord, Massachusetts, written in HTML, CSS, and JavaScript. It does not contact a phone provider, send email, or schedule a real meeting.

## Presentation walkthrough
1. Browse the public client preview. The agent workspace is visible only after agent login. On desktop, login is in the right sidebar. On mobile or tablet, press Log in to open the centered popup. Escape, the close button, or clicking the backdrop dismisses it.
2. Log in as the client: alex@example.com / ClientDemo123!.
3. In “Let’s connect,” select Phone call, Meeting, or Scheduled email. Show how the contact question changes. Use fictional details only.
4. Select Sell a home, Buy a home, Rent a property, or Get a valuation. Show the different timeline, property type, or address questions. “Your Current Path” updates immediately.
5. Continue to date/time selection. Reload the page: the step and previous answers remain saved. Go Back to adjust the path.
6. Continue to “Summary of Your Request.” Explain the recommended next step, then submit. The request appears in the client's personal list.
7. Click Cancel Appointment. Keep Appointment preserves the data; Confirm Cancel permanently removes just that request and displays a success toast. Escape also keeps the appointment. Use a disposable fictional request for this demonstration.
8. The client cannot see the agent navigation or full statistics. Manually navigate to #business to demonstrate the permission toast and return to #client.
9. Sign out, choose Agent login (this opens only the login form), and log in as agent@example.com / AgentDemo123!. The agent sees all shared requests and the live chart, but no client booking form or client navigation. Manually opening #client redirects to #business.
10. Change request status using the board or the keyboard/touch-friendly status menu. Selecting Cancelled uses the same confirmation dialog. In Messages, review the branch details and respond.
11. Run demo automations. Confirmed appointments receive simulated reminders; email requests receive simulated delivery. Repeated runs do not duplicate messages. The live chart and illustrative saved-time calculation update from the shared data.

## Rubric coverage
| Assignment requirement | Implementation |
| --- | --- |
| State management and persistence | Appointments, messages, settings, role/login state, and per-account branch drafts are stored in localStorage. Reload restores draft progress. |
| Dynamic calculations and feedback | Future-date and booking-conflict checks, live counts, and illustrative five-minute savings per automated action. |
| Interactive data visualization | Live bar chart recalculates active requests by communication type. |
| Drag-and-drop or canvas | Agent request board supports drag-and-drop, plus accessible status menus. |
| Complex decision trees / branching scenarios | Contact method and real estate goal change questions and recommended actions; valuation adds an address branch. |
| Responsive layout | Desktop sidebar; fixed flex-centered login overlay on mobile/tablet; scrollable cards on short screens. |
| UI states | Loading shell, saving feedback, invalid input/conflicts, empty lists/search, success and permission toasts, storage-error feedback, and destructive-action confirmation. |

The app implements all five categories of interactive mechanics; the assignment requires at least three. The teacher determines the final grade. The separate AI log/documentation requirements still apply to the submission; AI_LOG.txt was intentionally left unchanged in this update at the student's request.

## Role and storage behavior
Client accounts create bookings and view only their own requests. Agent accounts share the fictional agency order list and statistics. Guests can browse the client seed-data preview without changing saved appointments. They cannot view the agent workspace or global statistics. Agent login opens a separate login form, not the workspace. New accounts use unique fictional names and @example.com addresses. Registration is open for classroom role-playing, including the agent role.

The localStorage session contains account ID, role, loggedIn, and an eight-hour expiry. Role/account mismatches are rejected. Login and logout now apply across tabs in the same browser. Passwords use salted PBKDF2 hashes. This remains a browser-local simulation: browser developer tools can alter data, and separate devices do not share accounts. Do not use real passwords or private client information. A real deployment would need server-enforced identity and authorization.

Existing appointments keep the original concord-desk-v1 key and schema. New requests add optional branch/contact details and clientId; legacy name-owned records remain readable. Cancellation removes only the selected request after confirmation, and leaves it intact if saving fails. Existing automation history is preserved so illustrative calculations retain their meaning. Reset demo data is a separate agent action that restores the original samples; do not use it if you want to keep your current records.

Drafts use concord-branch-v2:<account ID> (or guest). Switching accounts loads the corresponding draft. On first client login, an unsaved guest path can be adopted. Submitted progress remains on its success screen until Make another request is clicked.

## Code defense
- index.html: page shell, navigation, reset dialog, cancellation dialog.
- styles.css: green palette, typography, cards, responsive grids, and modal layout.
- auth.js: demo account hashing, registration, persistent session, login UI, and cross-tab session updates.
- app.js: appointments, rendering, branch questions, validation, draft persistence, status changes, cancellation, chart, and simulation logic.

Data flow: input event → update draft → save draft JSON → show the current path. Continue validates the active branch. Submission validates availability and role, adds a request, saves the shared state, and renders the personal list. The agent view derives board columns, totals, and the chart from that same request state. runAutomations stores a unique key per action to prevent duplicates. esc escapes user-entered text before inserting it into HTML.

render checks the account role before choosing a page, hides disallowed navigation, and redirects a manual unauthorized route. Action handlers repeat ownership/role checks. requestCancellation only opens the dialog; confirmCancellation verifies the current account again and saves the filtered request list before changing in-memory state.

## Verification and running locally
Serve the dist directory with a static server, for example `python3 -m http.server 8000 --directory dist`. Open http://localhost:8000. No build or dependency installation is needed.

Run these checks with Node:
- `node tests/state.test.cjs` — 11 checks for existing state, conflicts, persistence, and unchanged automation behavior.
- `node tests/auth.test.cjs` — 16 checks for login, signup, password handling, roles, reload, and expiry.
- `node tests/login-flow.test.cjs` — 26 checks for route restrictions, ownership, cancellation, storage failure, branch persistence, and branch variants.

All 53 checks passed. Browser checks verified login centering at 390×844 and 768×1024, scrollable signup at 320×568 with 16-pixel edge spacing, a desktop sidebar at 1440 pixels, branch progress after reload, summary content, cancellation-dialog wording, Keep Appointment, and manual-route redirects for both roles. Narrow-screen dashboard overflow found during testing was corrected. These checks are evidence of the tested flows, not a promise that every browser or device has been tested.
