import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
// Page
import HomePage from "./pages/HomePage";

// Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";
// Error
import Error404 from "./pages/Error404";
import VideosSection from './components/sections/VideosSection';
import DemoSection from './components/sections/DemoSection';
import ThemeInitializer from './components/ThemeInitializer';


const App = () => {
  return (
    <ThemeInitializer>    
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<HomePage />} />
          <Route path='videos/:id' element={<VideosSection />} />
          <Route path='demo/:id' element={<DemoSection />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>      
    </ThemeInitializer>
  )
}
export default App;