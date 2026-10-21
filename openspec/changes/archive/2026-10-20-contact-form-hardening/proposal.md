# Proposal: Contact Form Hardening

## Intent
The contact form is the **only path for recruiters to reach the developer**. Currently it POSTs to `VITE_CONTACTFORM_URL` (Formspree) but silently fails if the env var is unset, has no client-side validation beyond HTML5 `required`, no loading state, no i18n feedback toasts, and uses hardcoded Spanish strings. This change makes the contact form production-ready.

## Scope

### In Scope
- Add `.env.example` with `VITE_CONTACTFORM_URL` documentation
- Guard submit: early return with i18n toast if env var missing
- Client-side validation: email format, min-length message, honeypot field
- Loading/disabled state during submit (prevent double-submit)
- i18n success/error toasts (replace hardcoded ES strings)
- Keep Formspree endpoint (no provider migration)
- Update `README.md` to reflect Formspree (not EmailJS)

### Out of Scope
- Migration to EmailJS or custom Vercel serverless + Resend
- Backend verification beyond Formspree's built-in honeypot/spam protection
- reCAPTCHA / Turnstile integration
- Rate limiting (Formspree handles this)
- File uploads

## Capabilities

### New Capabilities
- `contact-form-validation`: client-side validation rules and feedback
- `contact-form-toasts`: i18n success/error toast notifications
- `contact-form-guard`: env var presence check before submit

### Modified Capabilities
- `contact-form-submit`: add guard, validation, loading state, i18n toasts

## Approach
**Option A (Recommended): Formspree + .env.example + guarded submit + i18n toasts**
- Near-zero new code, free tier, keeps existing endpoint
- Minimal diff, low risk, high recruiter impact

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/sections/ContactoSection.tsx` | Modified | Add guard, validation, loading state, i18n toasts |
| `src/locales/es/translation.json` | Modified | Add toast keys (success, error, validating) |
| `src/locales/en/translation.json` | Modified | Add toast keys (success, error, validating) |
| `.env.example` | New | Document `VITE_CONTACTFORM_URL` |
| `README.md` | Modified | Update contact section to Formspree (remove EmailJS mention) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Stale `README.md` says EmailJS | High | Update in this change |
| Stale `openspec/config.yaml` says JS/testing:none | Med | Update in parallel or separate change |
| Hardcoded ES strings in toasts | High | Replace with i18n keys in this change |
| `index.html` references `main.jsx` (actual: `main.tsx`) | Low | Fix in hygiene change |

## Rollback Plan
1. Revert `ContactoSection.tsx` to previous version (git checkout HEAD~1 -- src/components/sections/ContactoSection.tsx)
2. Revert i18n keys if added
3. Remove `.env.example` if created
4. Formspree endpoint unchanged — no backend rollback needed

## Dependencies
- `react-hot-toast` already installed (used elsewhere)
- Formspree endpoint already configured (just needs env var)

## Success Criteria
- [ ] Form submits successfully when `VITE_CONTACTFORM_URL` is set
- [ ] Form shows i18n error toast when env var missing (no crash)
- [ ] Form validates email format, message length, honeypot before submit
- [ ] Loading state disables button and shows spinner during submit
- [ ] Success/error toasts appear in correct language (ES/EN)
- [ ] No hardcoded Spanish strings remain in ContactoSection
- [ ] `npm run typecheck`, `lint`, `test`, `build` all pass
- [ ] Recruiter can send test message and receive it