# Proposal: refactor-header-scroll

## Intent
Fix two code quality issues found in code review: component naming inconsistency and function duplication.

## Changes

### Change 1: Rename Header → Navbar for consistency
- `src/components/layout/Header.jsx` exports as `Navbar` but is imported as `Header`
- **Option B**: Rename export to `Header` (consumers already call it Header)
  - Change `export default Navbar` → `export default Header` and rename the function
  - Update all internal references

### Change 2: Remove duplicate scrollToSection
- `src/components/ui/ScrollToTop.jsx` has a local `scrollToSection` function identical to `src/utils/scrollToSection.js`
- Remove the local duplicate and import from utils instead

## Files affected
- `src/components/layout/Header.jsx`
- `src/components/ui/ScrollToTop.jsx`

## Risk
None. Both are mechanical renames/deletions with no behavior change.