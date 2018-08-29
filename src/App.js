import React from "react";

import { removeProtected } from './DOMFunction.js'
import { BrowserRouter, Route, Link, Redirect, withRouter} from 'react-router-dom'
import { deleteCookie, getCookie, setCookie } from './cookie.js'
import { searchFunction } from './stock.js'
import { accessFunction } from './repo.js'
import { personSearch } from './personSearch.js'
import { protectedContent } from './protected.js'
import { DynamoTable } from './AWSSDKconfig.js'


// import { withAuthenticator, AWS } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
// import { Auth } from 'aws-amplify';
// import { AWSCognito } from 'amazon-cognito-identity-js';
// var AWSCognito = require('amazon-cognito-identity-js');

let login = false;


// Router definition
class App extends React.Component{
   render(){
     return (
        <div>
        <header>Cal Poly</header><br></br>
        <BrowserRouter>
          <div id ="ogB">
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/stock" component={Stock} />
            <Route path="/repo" component={Repo} />
            <Route path="/login" component={Login} />
            <Route path="/personSearch" component={PersonSearch} />
            <Route path="/petStore" component={PetStore} />
            <Route path="/storedInfo" component={DBtable} />
          </div>
        </BrowserRouter>

       </div>
    )}
}





//UPLOAD TESTING
class DBtable extends React.Component {
  render(){
     const DT = new DynamoTable();
     DT.configAWS();
     DT.getDynamoComments();
     return (
         <div id="contentItems" className="text">
            <input type="text" placeholder="Type here..." id="Input" className="textBox"></input>
            <button className= "button" onClick={DT.updateDynamo}>Upload Comment</button>
            <Link to="/"><button className= "button">Home</button></Link>
        </div>
     )}
}



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
           <Link to="/petStore"><button className= "button">Pet Store</button></Link>
           <Link to="/storedInfo"><button className= "button">Stored Info</button></Link>

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


// stock page : "https://amdelaur.calpoly.io/stock"
class Stock extends React.Component {
  render(){
     return (
         <div id="contentItems" className="text">
            <input type="text" placeholder="Type here..." id="Input" className="textBox"></input>
            <button id="bn" onClick={searchFunction} className="button">Search Stock</button>
            <Link to="/"><button className= "button">Home</button></Link>
        </div>
     )}
}

// repo page : "https://amdelaur.calpoly.io/repo"
class Repo extends React.Component {
  render(){
     return (
        <div>
            <div id="contentItems" className="text">
               <input type="text" placeholder="Type here..." id="Input" className="textBox"></input>
               <button id="bn" onClick={accessFunction} className="button">List Repos</button>
            </div>
          <Link to="/"><button className= "button">Home</button></Link>
        </div>
     )}
}

// This page mimics the functionality of the "simple search" widget on the portal
// PersonSearch page : "https://amdelaur.calpoly.io/personSearch"
class PersonSearch extends React.Component {
  render(){
     return (
        <div>
            <div id="contentItems" className="text">
               <input type="text" placeholder="Type here..." id="searchParam" className="textBox"></input>
               <button id="bn" onClick={personSearch} className="button">Search Person</button>
            </div>
          <Link to="/"><button className= "button">Home</button></Link>
        </div>
     )}
}

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
// definition for redirection of a secure page
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

// constant for keeping track of Authentication state
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
    login(){
        let client_id = "2fior6770hvto4u6kuq084j7fu";
        let redirect_uri = "http://localhost:3000/";
        let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
        `client_id=${client_id}&redirect_uri=${redirect_uri}`;
        window.location = loginUrl;
    }
    update(){
       console.log("inside this.update()")
       const id_token = getCookie("id_token");
       const update_url =  "https://cognito-dev.calpoly.edu/oauth2/authorize?response_type=token&client_id=2fior6770hvto4u6kuq084j7fu&redirect_uri=http://localhost:3000/";
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
   login = false;
   deleteCookie("id_token")
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



// handles an "id_token" in the url from cognito
function checkFunction(){
  let keyUrl = window.location.hash.substring(1);
  console.log("keyUrl :", keyUrl)
  if (keyUrl.includes("id_token")){
    var id_tokenVal = keyUrl.substring("id_token=".length, keyUrl.indexOf("&"));
    var exprIndex = keyUrl.indexOf("expires_in") + "expires_in=".length;
    var exprVal = keyUrl.substring(exprIndex, keyUrl.indexOf("&", exprIndex));
    ("expiration time : ", exprVal);
    setCookie("id_token", id_tokenVal, exprVal);
    window.location = "http://localhost:3000/";
  }
  loginFunc()
  return;
}


// ReactDOM.render(<App />, document.getElementById('root'));
export default App;















//
// const myAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };
//
//
// class MyStorage extends React.Component{
//     // set item with the key
//     static setItem(key: string, value: string): string{}
//     // get item with the key
//     static getItem(key: string): string{}
//     // remove item with the key
//     static removeItem(key: string): void{}
//     // clear out the storage
//     static clear(): void{}
//     // If the storage operations are async(i.e AsyncStorage)
//     // Then you need to sync those items into the memory in this method
//     static sync(): Promise<void>{}
// }
//
// // tell Auth to use your storage object
// Auth.configure({
//     storage: MyStorage
// });
//
//
// var data = { UserPoolId : 'us-east-1_resgd', ClientId : 'xyz' };
// // var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
// var userPool = new AWSCognito.CognitoUserPool(data);
// var cognitoUser = userPool.getCurrentUser();
//
// if (cognitoUser != null) {
//     cognitoUser.getSession(function(err, session) {
//         if (err) { alert(err); return; }
//         // Get refresh token before refreshing session
//
//         let refresh_token = session.getRefreshToken();
//         if (AWS.config.credentials.needsRefresh()) {
//             cognitoUser.refreshSession(refresh_token, (err, session) => {
//                 if(err) { console.log(err); }
//                 else {
//                     AWS.config.credentials.params.Logins['cognito-idp.<YOUR-REGION>.amazonaws.com/<YOUR_USER_POOL_ID>']  = session.getIdToken().getJwtToken();
//                     AWS.config.credentials.refresh((err)=> {
//                         if(err)  { console.log(err); }
//                         else{
//                             console.log("TOKEN SUCCESSFULLY UPDATED");
//                         }
//                     });
//                 }
//             });
//         }
//     });
// }
//
//
//
//
//
//
// const App = () => (
//   <div>
//      <header>Cal Poly</header><br></br>
//      <Router>
//        <div id ="ogB">
//
//          <hr />
//          <Route exact path="/" component={Home} />
//          <Route path="/stock" component={Stock} />
//          <Route path="/repo" component={Repo} />
//          <Route path="/login" component={Login} />
//          <PrivateRoute path="/protected" component={Protected} />
//          <Route path="/personSearch" component={PersonSearch} />
//        </div>
//      </Router>
//     </div>
// );
//
//
// class Home extends React.Component {
//   render(){
//     checkFunction();
//     removeProtected();
//      return (
//         <div>
//           <h2 id= "title">HTML Buttons</h2>
//             <Link to="/repo"><button className= "button">Display Repos</button></Link>
//             <Link to="/stock"><button className= "button">Check Stock Info</button></Link>
//             <Link to="/protected"><button className= "button">Protected Resource</button></Link>
//             <Link to="/personSearch"><button className= "button">Search Directory</button></Link>
//         </div>
//      )}
// }
//
//
// const Stock = () => (
//    <div id="contentItems" className="text">
//       <input type="text" placeholder="Type here..." id="Input" className="textBox"></input>
//       <button id="bn" onClick={searchFunction} className="button">Search Stock</button>
//       <Link to="/"><button className= "button">Home</button></Link>
//   </div>
// );
//
// const Repo = () => (
//   <div>
//       <div id="contentItems" className="text">
//          <input type="text" placeholder="Type here..." id="Input" className="textBox"></input>
//          <button id="bn" onClick={accessFunction} className="button">List Repos</button>
//       </div>
//     <Link to="/"><button className= "button">Home</button></Link>
//   </div>
// );
//
// const PersonSearch = () => (
//   <div>
//       <div id="contentItems" className="text">
//          <input type="text" placeholder="Type here..." id="searchParam" className="textBox"></input>
//          <button id="bn" onClick={personSearch} className="button">Search Person</button>
//       </div>
//     <Link to="/"><button className= "button">Home</button></Link>
//   </div>
// );
//
// class Protected extends React.Component {
//   render(){
//      protectedContent()
//      return (
//           <div id="contentItems" className="text">
//           <Link to="/"><button className= "button">Home</button></Link>
//         </div>
//      )}
// }
//
//
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       myAuth.isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );
//
// class Login extends React.Component {
//   state = {
//     redirectToReferrer: false
//   };
//
//
//   login = () => {
//      let client_id = "2fior6770hvto4u6kuq084j7fu";
//      let redirect_uri = "http://localhost:3000/";
//      let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
//      `client_id=${client_id}&redirect_uri=${redirect_uri}`;
//      window.location = loginUrl;
//  }
//
//
//   render() {
//     const { from } = this.props.location.state || { from: { pathname: "/" } };
//     const { redirectToReferrer } = this.state;
//
//     if (redirectToReferrer) {
//       return <Redirect to={from} />;
//     }
//
//     return (
//       this.login()
//     );
//   }
// }
//
//
// function checkFunction(){
//    // var data = { UserPoolId : 'us-east-1_resgd', ClientId : '2fior6770hvto4u6kuq084j7fu' };
//    // var userPool = new AWSCognito.CognitoUserPool(data);
//    // console.log('userPool',userPool);
//    // const cognitoUser = userPool.getCurrentUser();
//    // console.log('cognitoUser', cognitoUser);
//    // cognitoUser.getSession(function(err, session) {
//    //    let refresh_token = session.getRefreshToken();
//    //    console.log("refresh_token :", refresh_token)
//    //
//    // });
//   console.log("window.location.hash :", window.location.hash)
//   let keyUrl = window.location.hash.substring(1);
//   if (keyUrl.includes("id_token")){
//     var id_tokenVal = keyUrl.substring("id_token=".length, keyUrl.indexOf("&"))
//     var exprIndex = keyUrl.indexOf("expires_in") + "expires_in=".length
//     var exprVal = keyUrl.substring(exprIndex, keyUrl.indexOf("&", exprIndex))
//     console.log("expiration time : ", exprVal);
//     setCookie("id_token", id_tokenVal, exprVal);
//     window.location = window.location.origin
//   }
//
//   const key = getCookie("id_token");
//   if (key !== ""){
//     myAuth.authenticate(() => {
//          Login.State = { redirectToReferrer: true };
//        });
//   }
//   return;
// }
//
//
// // export default App;
//
// export default App;
