import React from "react";

import { removeProtected, getCookie, setCookie } from './DOMFunction'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import { searchFunction } from './stock.js'
import { accessFunction } from './repo.js'
import { personSearch } from './personSearch.js'
import { protectedContent } from './protected.js'


let login = false;

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
         <Route path="/PetStore" component={PetStore} />
         <Route path="/personSearch" component={PersonSearch} />
       </div>
     </Router>
    </div>
);


class Home extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         "Authenticated": false,
      }
   }
  render(){
    checkFunction();
    removeProtected();
    if (login){
      return (
           <div id="contentItems" className="text">
           <Link to="/repo"><button className= "button">Display Repos</button></Link>
           <Link to="/stock"><button className= "button">Check Stock Info</button></Link>
           <Link to="/personSearch"><button className= "button">Search Directory</button></Link>
           <button className="logButton" onClick={logoutFunc}>Log out</button>
           <h1>Protected Content</h1>
           <Link to="/PetStore"><button className= "button">Pet Store</button></Link>

          </div>
      )
   } else{
     return (
        <div>
        <Link to="/login"><button className= "logButton">Login</button></Link>
          <h2 id= "title">HTML Buttons</h2>
            <Link to="/repo"><button className= "button">Display Repos</button></Link>
            <Link to="/stock"><button className= "button">Check Stock Info</button></Link>
            <Link to="/personSearch"><button className= "button">Search Directory</button></Link>
        </div>
     )}
  }
}


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
//
// class Protected extends React.Component {
//    update(){
//       console.log("inside this.update()")
//       const id_token = getCookie("id_token");
//       const update_url =  "https://cognito-dev.calpoly.edu/oauth2/authorize?response_type=token&client_id=2fior6770hvto4u6kuq084j7fu&redirect_uri=https://angelodel01.github.io/react-scratch/";
//       if ( (id_token != "") && ((new Date(id_token.expDate) - new Date())/60000 < 30) ) {
//          console.log("update_url")
//          window.location = update_url;
//
//       }
//    }
//
//   render(){
//      // this.update();
//      return (
//           <div id="contentItems" className="text">
//           <Link to="/repo"><button className= "button">Display Repos</button></Link>
//           <Link to="/stock"><button className= "button">Check Stock Info</button></Link>
//           <Link to="/personSearch"><button className= "button">Search Directory</button></Link>
//           <Link to="/"><button className="logButton">Log out</button></Link>
//           <h1>Protected Content</h1>
//           <Link to="/PetStore"><button className= "button">Check Stock Info</button></Link>
//
//         </div>
//      )}
// }

class PetStore extends React.Component {
   render() {
      protectedContent();
      return (
           <div id="contentItems" className="text">
           <Link to="/"><button className="button">Home</button></Link>
        </div>
      )
   }
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
     login = () => {
        let client_id = "2fior6770hvto4u6kuq084j7fu";
        let redirect_uri = "http://localhost:3000/";
        let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
        `client_id=${client_id}&redirect_uri=${redirect_uri}`;
        window.location = loginUrl;
    }
    update(){
       console.log("inside this.update()")
       const id_token = getCookie("id_token");
       const update_url =  "https://cognito-dev.calpoly.edu/oauth2/authorize?response_type=token&client_id=2fior6770hvto4u6kuq084j7fu&redirect_uri=https://angelodel01.github.io/react-scratch/";
       if ( (id_token != "") && ((new Date(id_token.expDate) - new Date())/60000 < 30) ) {
          console.log("update_url")
          window.location = update_url;

       }
   }

  render() {
    this.update();
    return (
      this.login()
    );
  }
}

function logoutFunc(key){
   console.log("loginstate :", login)
   login = false;
   deletecook("id_token")
   const url = "http://localhost:3000/";
   window.location = url;
}
function loginFunc(){
   const key = getCookie("id_token");
   if (key !== ""){
      login = true;
   }
   return;
}
function deletecook(key) {
   setCookie("id_token", "wiped", 0)
}


function checkFunction(){
  // console.log("window.location.hash :", window.location.hash)
  let keyUrl = window.location.hash.substring(1);
  if (keyUrl.includes("id_token")){
    var id_tokenVal = keyUrl.substring("id_token=".length, keyUrl.indexOf("&"))
    var exprIndex = keyUrl.indexOf("expires_in") + "expires_in=".length
    var exprVal = keyUrl.substring(exprIndex, keyUrl.indexOf("&", exprIndex))
    console.log("expiration time : ", exprVal);
    setCookie("id_token", id_tokenVal, exprVal);
    window.location = window.location.origin
  }
  loginFunc()
  return;
}


export default App;
