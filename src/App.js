import React from "react";

import { removeProtected, getCookie, setCookie } from './DOMFunction'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import { searchFunction } from './stock.js'
import { accessFunction } from './repo.js'
import { personSearch } from './personSearch.js'
import { protectedContent } from './protected.js'


const App = () => (
  <div>
     <header>Cal Poly</header><br></br>
     <Router>
       <div id ="ogB">

         <hr />
         <Route exact path="/" component={Home} />
         <Route path="/stock" component={Stock} />
         <Route path="/repo" component={Repo} />
         <Route path="/login" component={Login} />
         <PrivateRoute path="/protected" component={Protected} />
         <Route path="/personSearch" component={PersonSearch} />
       </div>
     </Router>
    </div>
);


class Home extends React.Component {
  render(){
    checkFunction();
    removeProtected();
     return (
        <div>
          <h2 id= "title">HTML Buttons</h2>
            <Link to="/repo"><button className= "button">Display Repos</button></Link>
            <Link to="/stock"><button className= "button">Check Stock Info</button></Link>
            <Link to="/protected"><button className= "button">Protected Resource</button></Link>
            <Link to="/personSearch"><button className= "button">Search Directory</button></Link>
        </div>
     )}
}

// const Home = () => (
//   <div>
//     <h2 id= "title">HTML Buttons</h2>
//       <Link to="/repo"><button className= "button">Display Repos</button></Link>
//       <Link to="/stock"><button className= "button">Check Stock Info</button></Link>
//       <Link to="/protected"><button className= "button">Protected Resource</button></Link>
//       <Link to="/personSearch"><button className= "button">Search Directory</button></Link>
//   </div>
// );

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

class Protected extends React.Component {
  render(){
     protectedContent()
     return (
          <div id="contentItems" className="text">
          <Link to="/"><button className= "button">Home</button></Link>
        </div>
     )}
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  // login = () => {
  //   fakeAuth.authenticate(() => {
  //     this.setState({ redirectToReferrer: true });
  //   });
  // };

  login = () => {
     let client_id = "2fior6770hvto4u6kuq084j7fu";
     let redirect_uri = "http://localhost:3000/";
     let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
     `client_id=${client_id}&redirect_uri=${redirect_uri}`;
     window.location = loginUrl;
 }


  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button className="button" onClick={this.login}>Log in</button>
      </div>
    );
  }
}


function checkFunction(){
  console.log("window.location.hash :", window.location.hash)
  let keyUrl = window.location.hash.substring(1);
  if (keyUrl.includes("id_token")){
    var id_tokenVal = keyUrl.substring("id_token=".length, keyUrl.indexOf("&"))
    var exprIndex = keyUrl.indexOf("expires_in") + "expires_in=".length
    var exprVal = keyUrl.substring(exprIndex, keyUrl.indexOf("&", exprIndex))
    console.log("expiration time : ", exprVal);
    setCookie("id_token", id_tokenVal, exprVal);
    window.location = window.location.origin
  }

  const key = getCookie("id_token");
  if (key !== ""){
    Auth.authenticate(() => {
         Login.State = { redirectToReferrer: true };
       });
  }
  return;
}


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
