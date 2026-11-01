import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// Page
import HomePage from "./pages/HomePage";

// Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";
// Error
import Error404 from "./pages/Error404";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import Skeleton from "./components/ui/Skeleton";

// Deep routes only: the demo gallery and the video player stay out of the entry chunk.
const VideosSection = lazy(() => import('./components/sections/VideosSection'));
const DemoSection = lazy(() => import('./components/sections/DemoSection'));

const App = () => {
  const { pathname } = useLocation();

  return (
    <Routes>
      <Route path="/" element={<LayoutAdmin />}>
        <Route
          index
          element={
            <ErrorBoundary key={pathname} titleKey="errorBoundary.homeTitle">
              <HomePage />
            </ErrorBoundary>
          }
        />
        <Route
          path='videos/:id'
          element={
            <ErrorBoundary key={pathname} titleKey="errorBoundary.videoTitle">
              <Suspense fallback={<Skeleton className="min-h-96 max-w-7xl mx-auto" />}>
                <VideosSection />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='demo/:id'
          element={
            <ErrorBoundary key={pathname} titleKey="errorBoundary.demoTitle">
              <Suspense fallback={<Skeleton className="min-h-96 max-w-7xl mx-auto" />}>
                <DemoSection />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
export default App;
