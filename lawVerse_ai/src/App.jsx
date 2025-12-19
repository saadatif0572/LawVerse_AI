import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/layouts/navbar'
import Footer from './components/layouts/footer'
import Sidebar from './components/layouts/sidebar'
import Home from './components/pages/home'
import About from './components/pages/about'
import Contact from './components/pages/contact'
import Services from './components/pages/services'
import PrivacyPolicy from './components/pages/privacypolicy'
import SignIn from './components/pages/signin'
import SignUp from './components/pages/signup'
import LawyersDetails from './components/pages/LawyerDetails'

const App = () => {
  return (
    <div id="app-root" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%'
    }}>
      <Navbar />
      <div style={{
        display: 'flex',
        flex: 1,
        gap: '1rem',
        overflowY: 'auto'
      }}>
        <Sidebar />
        <div style={{
          flex: 1,
          padding: '2rem',
          width: '100%'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Dynamic routes */}
            <Route path="/lawyer/:id" element={<LawyersDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
