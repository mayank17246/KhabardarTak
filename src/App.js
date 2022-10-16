import './App.css';
import News from './components/News';
import Navbar from './components/Navbar';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// rcc for react based component
export default class App extends Component {
  //render() job is render html on screen, firstly compile jsx into html then the before written
  render() {
    
    return (
        <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={15} country="in" category="general"/>}/>
          <Route exact path="/business" element={<News key="business" pageSize={15} country="in" category="business"/>}/>
          <Route exact path="/science" element={<News key="science" pageSize={15} country="in" category="science"/>}/>
          <Route exact path="/sports" element={<News key="sports" pageSize={15} country="in" category="sports"/>}/>
          <Route exact path="/technology" element={<News key="technology" pageSize={15} country="in" category="technology"/>}/>
          <Route exact path="/health" element={<News key="health" pageSize={15} country="in" category="health"/>}/>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={15} country="in" category="entertainment"/>}/>

          
        </Routes>

        {/* <News pageSize={15} country="in" category="general"/> */}
      </div>
    </Router>
    )
  }
}
