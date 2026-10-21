# Contact Form Validation Specification

## Purpose

Client-side validation rules and inline feedback for the contact form (`ContactoSection`), preventing invalid payloads from reaching Formspree and giving recruiters immediate, i18n feedback.

## Requirements

### Requirement: R1 — Email format validation

The system MUST reject submissions where `email` does not match a valid email pattern before any network request.

#### Scenario: Valid email passes

- GIVEN the form is filled with a valid email (e.g. `recruiter@company.com`)
- WHEN the user submits
- THEN validation passes and the submit flow continues

#### Scenario: Invalid email is blocked

- GIVEN the email field contains `not-an-email`
- WHEN the user submits
- THEN no network request is made
- AND an inline i18n error message is shown for the email field

### Requirement: R2 — Message length validation

The system MUST require `mensaje` to be at least 10 and at most 500 characters.

#### Scenario: Too-short message is blocked

- GIVEN the message field contains 9 characters
- WHEN the user submits
- THEN no network request is made
- AND an inline i18n error states the minimum length

#### Scenario: Overlong message is blocked

- GIVEN the message field contains 501 characters
- WHEN the user submits
- THEN no network request is made
- AND an inline i18n error states the maximum length

### Requirement: R3 — Name length validation

The system MUST require `nombre` to be between 4 and 20 characters.

#### Scenario: Name out of range is blocked

- GIVEN the name field contains `Ana`
- WHEN the user submits
- THEN no network request is made
- AND an inline i18n error is shown for the name field

### Requirement: R4 — Honeypot field

The system MUST include a hidden honeypot field named `website` and MUST silently discard the submission when it is non-empty, without any network request or user-facing error.

#### Scenario: Bot fills honeypot

- GIVEN the hidden `website` field contains any value
- WHEN the user submits
- THEN the form does not send a network request
- AND no success or error toast is shown

#### Scenario: Human leaves honeypot empty

- GIVEN the `website` field is empty
- WHEN the user submits with all other fields valid
- THEN the submission proceeds normally

### Requirement: R5 — Inline i18n error feedback

Every validation failure MUST display an inline error message rendered from an i18n key in the active language, and MUST set `aria-invalid="true"` on the offending field.

#### Scenario: Error shown in active language

- GIVEN the active language is English and the message field is empty
- WHEN the user submits
- THEN the inline error is rendered from the EN translation, not a hardcoded string

## API / Interfaces

```ts
interface ContactFormData {
  nombre: string;   // 4–20 chars
  email: string;    // email pattern
  mensaje: string;  // 10–500 chars
  website?: string; // honeypot — must stay empty
}
```

## Data

| Key | Rule |
|-----|------|
| `contact.form.errors.email.pattern` | Invalid email format |
| `contact.form.errors.message.minLength` | Min 10 (`{count}`) |
| `contact.form.errors.message.maxLength` | Max 500 (`{count}`) |
| `contact.form.errors.name.minLength` | Min 4 (`{count}`) |
| `contact.form.errors.name.maxLength` | Max 20 (`{count}`) |

## Non-functional

- **Security**: validation is UX-only; Formspree remains the authoritative check. Honeypot field MUST stay visually hidden and unlabeled to assistive tech.
- **Accessibility**: errors MUST be associated with their field via `aria-describedby` and rendered in an `aria-live` region.
- **Performance**: validation MUST run client-side with zero network cost.