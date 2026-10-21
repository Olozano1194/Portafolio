# Contact Form Guard Specification

## Purpose

Fail-fast guard: verify `VITE_CONTACTFORM_URL` is present before submitting, so a misconfigured deployment produces a clear i18n toast instead of a silent crash or a `fetch(undefined)` call.

## Requirements

### Requirement: R1 — Env var presence check before fetch

The system MUST check that `import.meta.env.VITE_CONTACTFORM_URL` is defined and non-empty BEFORE initiating the `fetch` request. If missing, the system MUST abort the submit flow without any network request.

#### Scenario: Env var set

- GIVEN `VITE_CONTACTFORM_URL` is defined at build time
- WHEN the user submits a valid form
- THEN the request is sent to that URL

#### Scenario: Env var missing

- GIVEN `VITE_CONTACTFORM_URL` is undefined (e.g. `.env` not copied on a fresh clone)
- WHEN the user submits a valid form
- THEN no network request is made
- AND an i18n error toast is shown
- AND the app does not crash and the form data is preserved

### Requirement: R2 — Distinct missing-config feedback

The system MUST show a dedicated i18n toast key for the missing-configuration case, distinct from the generic submission-error toast, so the failure is diagnosable.

#### Scenario: Missing config is distinguishable

- GIVEN `VITE_CONTACTFORM_URL` is unset and the user submits
- WHEN the toast appears
- THEN it renders the `contact.toast.envMissing` key, not `contact.toast.error`

### Requirement: R3 — `.env.example` documents the variable

The repository MUST contain a `.env.example` file that documents `VITE_CONTACTFORM_URL` (name, purpose, Formspree origin) without committing any real URL secret.

#### Scenario: Fresh clone setup

- GIVEN a developer clones the repo and copies `.env.example` to `.env`
- WHEN they fill in their Formspree endpoint
- THEN the contact form works without code changes

#### Scenario: No real endpoint committed

- GIVEN `.env.example` is inspected
- WHEN reviewed
- THEN it contains only a placeholder value, not a live Formspree URL

## API / Interfaces

```ts
const contactUrl: string | undefined = import.meta.env.VITE_CONTACTFORM_URL;
// Guard: if (!contactUrl) → toast + early return
```

## Data

| Variable / Key | Value | Notes |
|----------------|-------|-------|
| `VITE_CONTACTFORM_URL` | Formspree endpoint URL | Build-time; documented in `.env.example` |
| `.env.example` | `VITE_CONTACTFORM_URL=` placeholder | New file, committed |
| `contact.toast.envMissing` | Config-missing message (ES/EN) | Distinct from generic error toast |

## Non-functional

- **Security**: never commit real endpoints in `.env.example`; only `.env` (gitignored) holds the live value.
- **Reliability**: guard MUST run before `setIsLoading(true)` so the loading state never sticks on the missing-config path.
- **Supportability**: the missing-config toast must let a recruiter/reporter communicate the failure precisely.
