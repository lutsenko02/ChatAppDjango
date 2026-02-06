import React from "react";
import '../styles/Home.css';
import About from '../components/About';
import Hello from "../components/Hello";
import Leads from "../components/Leads";
import Courses from "../components/Courses";
import ActiveCourse from "../components/ActiveCourse";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Account from "../components/Account";

const Home = () => {

  return (
    <div>
      <Hello />
      <About />
      <Leads />
      <Courses />
      <ActiveCourse />
      {/* <Account /> */}
      <Form />
      <Footer />
    </div>

  );
};

export default Home;