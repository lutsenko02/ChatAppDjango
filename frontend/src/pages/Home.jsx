import React from "react";
import '../styles/Home.css';
import About from '../components/About';
import Hello from "../components/Hello";
import Leads from "../components/Leads";
import Courses from "../components/Courses";

const Home = () => {

  return (
    <div>
      <Hello />
      <About />
      <Leads />
      <Courses />
    </div>

  );
};

export default Home;