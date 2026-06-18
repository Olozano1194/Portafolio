# Design: refactor-header-scroll

## Change 1: Rename Navbar → Header

### Before
```jsx
// Header.jsx
const Navbar = () => { ... };
export default Navbar;
```

### After
```jsx
// Header.jsx
const Header = () => { ... };
export default Header;
```

No consumer changes needed — imports use file path, not component name.

### Internal references to update (within Header.jsx)
None. The component name is only used for the function declaration and export.

## Change 2: Deduplicate scrollToSection

### Before (ScrollToTop.jsx)
```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 64;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
};

const ScrollToTop = () => { ... uses scrollToSection ... };
```

### After (ScrollToTop.jsx)
```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '../../utils/scrollToSection';

const ScrollToTop = () => { ... uses scrollToSection ... };
```

Remove lines 4-12 (the local function), add import.