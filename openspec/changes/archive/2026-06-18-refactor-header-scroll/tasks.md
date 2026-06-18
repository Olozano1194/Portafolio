# Tasks: refactor-header-scroll

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 12 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Rename Navbar to Header and deduplicate scrollToSection | PR 1 | Single PR; base: main; includes both changes |

## Phase 1: Rename Navbar to Header

- [x] 1.1 Rename function declaration from `const Navbar = () => {` to `const Header = () => {` in `src/components/layout/Header.jsx` (line 33)
  - Files affected: `src/components/layout/Header.jsx`
  - Verification: Function name matches component usage; no compile errors.
  - Estimated effort: small

- [x] 1.2 Update export statement from `export default Navbar;` to `export default Header;` in `src/components/layout/Header.jsx` (line 164)
  - Files affected: `src/components/layout/Header.jsx`
  - Verification: Import in App.jsx and LayoutAdmin.tsx still resolves correctly.
  - Estimated effort: small

## Phase 2: Deduplicate scrollToSection

- [x] 2.1 Remove local `scrollToSection` function definition (lines 4-12) from `src/components/ui/ScrollToTop.jsx`
  - Files affected: `src/components/ui/ScrollToTop.jsx`
  - Verification: No duplicate function; component still compiles.
  - Estimated effort: small

- [x] 2.2 Add import statement `import { scrollToSection } from '../../utils/scrollToSection';` at top of `src/components/ui/ScrollToTop.jsx`
  - Files affected: `src/components/ui/ScrollToTop.jsx`
  - Verification: Import resolves; scrollToSection used in useEffect works.
  - Estimated effort: small

## Phase 3: Verification

- [ ] 3.1 Verify rename does not break imports: run `npm run build` (or equivalent) and ensure no compile errors.
  - Files affected: none (build output)
  - Verification: Build succeeds; Header component renders correctly.
  - Estimated effort: small

- [ ] 3.2 Test scroll-to-section on navigation: click a nav link, verify smooth scroll to section; verify scroll-to-top on normal route change.
  - Files affected: none (runtime behavior)
  - Verification: Manual test or automated e2e; both scroll behaviors work.
  - Estimated effort: small