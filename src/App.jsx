import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
// Page
import HomePage from "./pages/HomePage";

// Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";
// Error
import Error404 from "./pages/Error404";
// import Redes from './components/Redes';
// import SobreMi from './components/SobreMi';
// import Skills from './components/Skills';
// import SoftSkills from './components/SoftSkills';
// import Hobbies from './components/Hobbies';
// import FormacionAcademica from './components/FormacionAcademica'
// import Proyectos from './components/Proyectos';
// import Contacto from './components/Contacto';
// import Videos from './components/Videos';
// import Demo from './components/Demo';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<HomePage />} />
          {/* <Route path="about" element={<AboutPage />} />
          <Route path="terminos" element={<TermsPage />} />
          <Route path="privacidad" element={<PrivacyPage />} />
          <Route path="cookies" element={<CookiesPage />} /> */}
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      {/* <Header />

      <Routes>
        <Route path="/" element={
          <main className='bg-bg px-2 dark:bg-dark-bg'>
            <Redes />
            <SobreMi />
            <FormacionAcademica />
            <Proyectos />
            <Skills />
            <SoftSkills />
            <Hobbies />
          </main>
        }
        />
        <Route path="/Demo/:demoId" element={
          <main className='bg-bg p-5 dark:bg-dark-bg'>
            <Demo />
          </main>
        }
        />
        <Route path="/Videos/:videosId" element={
          <main className='bg-bg p-5 dark:bg-dark-bg'>
            <Videos />
          </main>
        }
        />
      </Routes>
      <footer className='bg-text-secondary dark:bg-dark-bg p-5'>
        <Contacto />
      </footer> */}
    </> 
  )
}
export default App;