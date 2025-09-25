import React from "react";
import Herosection from './components/hero_section/hero';
import Features from "./components/features/features";
import Courses from "./components/courses/courses";
import Testimonials from "./components/testimonial/testimonial";
import Contact from "./components/contact/contact";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ add this
import "bootstrap-icons/font/bootstrap-icons.css";
import OsintAndAI from "./components/osint/osint";
import Dashboard from "./components/dashboard/dashboard";
import Footer from "./components/footer/footer";
import Gpt from './components/gpt/gpt'
import { Route,Routes,Router } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

function App() {
  return (<>
    {/* <Navbar/> */}
    {/* <main class="container py-5">
      <Herosection/>
      <Courses/>
      <Features/>
      <OsintAndAI/>
      <Testimonials/>
      <Dashboard/>
      <Gpt/>
    </main>
    <Footer/> */}
    
      <Routes>
        <Route path="/" element={<><Navbar/> <Herosection/> <Footer/></>} /> 
      </Routes>
      <Routes>
        <Route path="/courses" element={ <><Navbar/> <Courses/> <Footer/></>} /> 
      </Routes>
      <Routes>
        <Route path="/features" element={ <><Navbar/> <Features/> <Footer/></>} /> 
      </Routes>
      <Routes>
        <Route path="/osinttool" element={ <><Navbar/> <OsintAndAI/> <Footer/></>} /> 
      </Routes>
      <Routes>
        <Route path="/testimonials" element={ <><Navbar/><Testimonials/> <Footer/></>} /> 
      </Routes>
      <Routes>
        <Route path="/contact" element={ <><Navbar/> <Contact/> <Footer/></>} /> 
      </Routes>
      <Routes>
        <Route path="/gpt" element={<><Navbar/> <Gpt/> <Footer/></> } /> 
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<><Navbar/> <Dashboard/> <Footer/></> } /> 
      </Routes>
      <Routes>
        <Route path="/login" element={ <LoginPage/>} /> 
      </Routes>
      <Routes>
        <Route path="/signup"  element={ <SignupPage/>} /> 
      </Routes>
      
 
       
        
    </>
  );
}
export default App;

