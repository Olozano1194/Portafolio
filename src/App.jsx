import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Redes from './components/Redes';
import SobreMi from './components/SobreMi';
import Skills from './components/Skills';
import SoftSkills from './components/SoftSkills';
import Hobbies from './components/Hobbies';
import FormacionAcademica from './components/FormacionAcademica'
import Proyectos from './components/Proyectos';
import Contacto from './components/Contacto';
import Videos from './components/Videos';
import Demo from './components/Demo';

function App() {
  
  return (
    <>
      <header className='w-full bg-text-secondary flex justify-between lg:gap-3 p-2 sticky top-0 z-20 dark:bg-dark-bg'>
        <Navbar />
      </header>
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
      </footer>
    </> 
  )
}

export default App
