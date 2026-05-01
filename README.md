# AmeriTrust Companion Model

A lightweight branded companion chatbot model that can sit alongside an existing AmeriTrust application flow.

## What is included

- Example host application step
- Floating/minimizable companion chatbot
- Applicant context chips scoped to the current step
- Simple chat conversation surface
- Suggested starter questions
- Basic plain-language response behavior
- PII/PHI avoidance warning and state assistance routing
- Responsive layout for desktop and mobile

## Open locally

Open `index.html` in a browser. No build step is required.

## Next implementation steps

- Mount the companion into the real application shell.
- Pass only non-sensitive step context into the helper.
- Replace demo replies with approved guidance content.
- Add guardrails for eligibility claims and sensitive data.
- Add handoff behavior when the helper cannot answer confidently.
- Configure official state contact links, phone numbers, and portal URLs by deployment.
