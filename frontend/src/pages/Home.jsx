import React from "react";
import '../styles/Home.css';
import About from '../components/About';
import Hello from "../components/Hello";
import Leads from "../components/Leads";
import Courses from "../components/Courses";
import ActiveCourse from "../components/ActiveCourse";
import Footer from "../components/Footer";

const Home = () => {

  return (
    <div>
      <Hello />
      <About />
      <Leads />
      <Courses />
      <ActiveCourse />
      <Footer />
    </div>

  );
};

export default Home;