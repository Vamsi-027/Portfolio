// src/App.js
import { createContext, useContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useCustomAlert, AlertContainer } from './components/CustomAlert';
import NetworkAccessNotice from './components/NetworkAccessNotice';

// Create Alert Context
const AlertContext = createContext();

// Custom hook to use alerts
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

function App() {
  const alertSystem = useCustomAlert();

  return (
    <AlertContext.Provider value={alertSystem}>
      <div>
        <Header />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
        <ScrollToTop />
        <AlertContainer 
          alerts={alertSystem.alerts} 
          onRemoveAlert={alertSystem.removeAlert} 
        />
        <NetworkAccessNotice />
      </div>
    </AlertContext.Provider>
  );
}

export default App;