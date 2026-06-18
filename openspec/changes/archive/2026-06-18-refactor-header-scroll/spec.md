# Spec: refactor-header-scroll

## Change 1: Rename Navbar → Header

### Current state
- File: `src/components/layout/Header.jsx`
- Export: `export default Navbar` (function name `Navbar`)
- Consumers: `App.jsx` and `LayoutAdmin.tsx` import as `Header from './...'`

### Target state
- Function renamed to `Header`
- Export: `export default Header`
- All behavior unchanged

### Rejection criteria
- Any import breaks → reject
- Component behavior changes → reject

## Change 2: Deduplicate scrollToSection

### Current state
- `src/components/ui/ScrollToTop.jsx` defines its own `scrollToSection(id)` (lines 4-12)
- `src/utils/scrollToSection.js` has identical function

### Target state
- Remove local `scrollToSection` from `ScrollToTop.jsx`
- Add `import { scrollToSection } from '../../utils/scrollToSection'`
- Verify it works via the `state.scrollTo` flow from navigation

### Rejection criteria
- Scroll-to-section on navigation breaks → reject
- Scroll-to-top on normal route change breaks → reject