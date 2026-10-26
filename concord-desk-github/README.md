# Concord Desk

A classroom real estate reception demo for Concord, Massachusetts, built with HTML, CSS, and JavaScript.

[Open the live demo](https://concord-desk-classroom-1021.hj9j6jchw9.chatgpt.site)

## Features
- Branching booking flow with saved progress and recommended next steps.
- Client accounts with personal appointment lists.
- Agent-only dashboard, status board, live statistics, and simulated communications.
- Confirmation before cancellation.
- Desktop login sidebar and centered mobile/tablet login popup.

## Demo accounts
| Role | Email | Password |
| --- | --- | --- |
| Client | alex@example.com | ClientDemo123! |
| Agent | agent@example.com | AgentDemo123! |

These credentials are public fictional examples. Authentication and appointments are stored in the browser. This is not production access control. No real calls, emails, or meeting invitations are sent. Use fictional information and made-up passwords only.

## Run locally
From this folder run:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. There is no installation or build step.

## Test
```sh
node tests/state.test.cjs
node tests/auth.test.cjs
node tests/login-flow.test.cjs
```

The suites contain 53 checks. See [PROJECT_GUIDE.md](PROJECT_GUIDE.md) for the rubric map, demonstration steps, architecture, and verification details. See [AI_LOG.txt](AI_LOG.txt) for the AI disclosure supplied with the classroom project; it was intentionally not updated during the latest revisions at the student's request.

## Hosting
The existing live demo is hosted separately. Updating this GitHub repository alone does not deploy changes to the live site.
