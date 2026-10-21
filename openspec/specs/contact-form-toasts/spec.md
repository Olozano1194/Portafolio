# Contact Form Toasts Specification

## Purpose

i18n success/error toast notifications for the contact form, replacing hardcoded Spanish strings so recruiters get feedback in their active language (ES/EN).

## Requirements

### Requirement: R1 — Success toast after accepted submission

The system MUST show a success toast rendered from an i18n key after Formspree responds with a 2xx status.

#### Scenario: Successful submit shows localized success

- GIVEN the active language is English and the form is valid
- WHEN the submission succeeds
- THEN a success toast is shown with the EN success message
- AND the form fields are reset

### Requirement: R2 — Error toast on failed submission

The system MUST show an error toast rendered from an i18n key when the request fails (network error, non-2xx response, or malformed response body). The toast MUST NOT contain hardcoded Spanish text.

#### Scenario: Network failure shows localized error

- GIVEN the device is offline
- WHEN the user submits a valid form
- THEN an error toast is shown with the generic EN error message
- AND the form fields are preserved

#### Scenario: Formspree rejects with 4xx

- GIVEN Formspree responds `422`
- WHEN the user submits
- THEN an error toast is shown in the active language
- AND no success toast appears

### Requirement: R3 — Language consistency

Toast messages MUST use the same active language as the rest of the UI and MUST switch when the user changes language between renders.

#### Scenario: Toast follows active locale

- GIVEN the user switches the UI to Spanish
- WHEN a submission fails
- THEN the error toast is rendered from the ES translation

#### Scenario: No hardcoded strings

- GIVEN the toast code in `ContactoSection.tsx`
- WHEN reviewed
- THEN no Spanish (or other) user-facing string literals appear in toast calls — only i18n keys

## API / Interfaces

Toast invocations (via `react-hot-toast`):

```ts
toast.success(t('contact.toast.success'));
toast.error(t('contact.toast.error'));
```

## Data

| i18n key | ES (intent) | EN (intent) |
|----------|-------------|-------------|
| `contact.toast.success` | Message sent; reply within 24h | Message sent; you'll get a reply within 24 hours |
| `contact.toast.error` | Generic send failure | Sorry, your message could not be sent. Please try again |

Both keys MUST exist in `src/locales/es/translation.json` and `src/locales/en/translation.json`.

## Non-functional

- **Accessibility**: toasts MUST be announced to screen readers (react-hot-toast default `aria-live` behavior preserved).
- **Performance**: no extra network calls; toasts are local UI events.
- **UX**: exactly one toast per submit attempt; success and error toasts MUST NOT appear together.