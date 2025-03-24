import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import './App.css'

function App() {
  
  return (
    <BrowserRouter basename='/portafolio'>
      <header className='w-full bg-slate-500 flex justify-between lg:gap-3 p-2 sticky top-0 z-20'>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={
            <main className='bg-gray-200 p-5'>
              <Redes />
              <SobreMi />
              <Skills />
              <SoftSkills />
              <Hobbies />
              <FormacionAcademica />
              <Proyectos />            
            </main>
          } 
        />

        <Route path="/Videos/:videosId" element={
            <main className='bg-gray-200 p-5'>
              <Videos />
            </main>
          } 
        />   
        
      </Routes>
      
      <footer className='bg-slate-500 p-5'>
        <Contacto />
      </footer>
      
    </BrowserRouter>
  )
}

export default App
