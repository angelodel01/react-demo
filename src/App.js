import React from "react";

import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import { searchFunction } from './stock.js'
import { accessFunction } from './repo.js'
import { personSearch } from './personSearch.js'


const App = () => (
  <div>
     <header>Cal Poly</header><br></br>
     <Router>
       <div id ="ogB">

         <hr />

         <Route exact path="/" component={Home} />
         <Route path="/stock" component={Stock} />
         <Route path="/repo" component={Repo} />
         <Route path="/protected" component={Protected} />
         <Route path="/personSearch" component={PersonSearch} />
       </div>
     </Router>
    </div>
);

const Home = () => (
  <div>
    <h2 id= "title">HTML Buttons</h2>
      <Link to="/repo"><button className= "button">Display Repos</button></Link>
      <Link to="/stock"><button className= "button">Check Stock Info</button></Link>
      <Link to="/protected"><button className= "button">Protected Resource</button></Link>
      <Link to="/personSearch"><button className= "button">Search Directory</button></Link>
  </div>
);

const Stock = () => (
   <div id="contentItems" className="text">
      <input type="text" placeholder="Type here..." id="Input" className="textBox"></input>
      <button id="bn" onClick={searchFunction} className="button">Search Stock</button>
      <Link to="/"><button className= "button">Home</button></Link>
  </div>
);

const Repo = () => (
  <div>
      <div id="contentItems" className="text">
         <input type="text" placeholder="Type here..." id="Input" className="textBox"></input>
         <button id="bn" onClick={accessFunction} className="button">List Repos</button>
      </div>
    <Link to="/"><button className= "button">Home</button></Link>
  </div>
);

const PersonSearch = () => (
  <div>
      <div id="contentItems" className="text">
         <input type="text" placeholder="Type here..." id="searchParam" className="textBox"></input>
         <button id="bn" onClick={personSearch} className="button">Search Person</button>
      </div>
    <Link to="/"><button className= "button">Home</button></Link>
  </div>
);

const Protected = () => (
  <div>
    <Link to="/"><button className= "button">Home</button></Link>
  </div>
);


export default App;






// import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
// import logo from './logo.svg';
// import './App.css';
//
//
// function Button(props){
//    return(
//       <button
//          class = "button"
//          onclick={props.onClick}
//       >
//          {props.message}
//       </button>
//    );
// }
//
//
// class App extends Component {
//    constructor(props){
//       super(props);
//       this.state = {
//          location: null,
//          pages: ["Home"]
//       }
//    }
//    let content;
//   render() {
//     return (
//
//     );
//   }
// }
//
// export default App;
