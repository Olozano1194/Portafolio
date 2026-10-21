# Delta for Contact Form Submit

No main spec exists yet for `contact-form-submit` (`openspec/specs/` is empty); this delta therefore contains only ADDED requirements, which become the initial main spec at archive time.

## ADDED Requirements

### Requirement: R1 — Guarded submit flow

The submit handler MUST run the env-var guard (`contact-form-guard`) before any network activity. A missing `VITE_CONTACTFORM_URL` MUST abort submission with an i18n toast and MUST NOT enter the loading state.

#### Scenario: Submit with env var configured

- GIVEN `VITE_CONTACTFORM_URL` is set and all fields are valid
- WHEN the user submits
- THEN a POST request is sent with `Content-Type: application/json` and `Accept: application/json`

#### Scenario: Submit without env var

- GIVEN `VITE_CONTACTFORM_URL` is unset
- WHEN the user submits
- THEN no fetch occurs, the env-missing toast appears, and the app does not crash

### Requirement: R2 — Validation before network

The submit flow MUST run client-side validation (`contact-form-validation`) before issuing any request. Invalid forms MUST NOT hit the network.

#### Scenario: Invalid form never fetches

- GIVEN the email field contains an invalid address
- WHEN the user submits
- THEN the request is never sent and the inline error is shown

### Requirement: R3 — Loading state prevents double-submit

The system MUST expose a loading state during submission that disables the submit button, shows a spinner, and ignores further submit attempts until the request settles.

#### Scenario: Button disabled during submit

- GIVEN a submission is in flight
- WHEN the user clicks the submit button again
- THEN no second request is issued
- AND the button is visibly disabled with a spinner

#### Scenario: Loading cleared on completion

- GIVEN a submission finishes (success or failure)
- WHEN the response settles
- THEN the loading state clears and the button becomes enabled again

### Requirement: R4 — i18n toasts replace hardcoded strings

All submit-flow feedback (success, error, missing config) MUST use i18n keys (`contact-form-toasts`, `contact-form-guard`). No hardcoded Spanish strings MUST remain in `ContactoSection.tsx`.

#### Scenario: EN user gets EN feedback

- GIVEN the UI language is English
- WHEN a submission succeeds
- THEN the success toast is English

#### Scenario: No hardcoded literals

- GIVEN `ContactoSection.tsx` is reviewed
- WHEN searching toast and fallback-error calls
- THEN every user-facing message resolves through `t(...)`

## API / Interfaces

```ts
// Submit pipeline (order matters):
// 1. honeypot check → silent abort
// 2. env guard      → toast + abort
// 3. validation     → inline errors + abort
// 4. isLoading=true → fetch → toast → reset → isLoading=false
```

## Data

| Item | Value |
|------|-------|
| Env var | `VITE_CONTACTFORM_URL` |
| Toast keys | `contact.toast.success`, `contact.toast.error`, `contact.toast.envMissing` |
| Component | `src/components/sections/ContactoSection.tsx` |

## Non-functional

- **Reliability**: `isLoading` MUST be cleared in a `finally` block so a thrown error never leaves the button disabled.
- **Security**: honeypot and guard run before the request; no secrets beyond the env-provided URL exist client-side.
- **Accessibility**: disabled button MUST expose `aria-busy` or equivalent during submit; spinner MUST have an accessible label from i18n.
- **Quality gate**: `typecheck`, `lint`, `test`, and `build` MUST pass (proposal success criteria).
