import React from "react";

import { getCookie } from './cookie.js'
import * as AWS from 'aws-sdk'
import { createDiv } from './DOMFunction.js'
// import jwt_decode from 'jwt-decode'
const jwtDecode = require('jwt-decode');




export class DynamoTable extends React.Component {
   configAWS() {
      this.token = getCookie('id_token');
      this.decoded = jwtDecode(this.token);
      this.iss = this.decoded.iss
      this.user_pool_id = this.iss.slice(this.iss.indexOf(".com/") + 5, this.iss.length)
      this.region = this.user_pool_id.slice(0, this.user_pool_id.indexOf("_"))
      this.name = this.decoded["cognito:username"]

      let client_id = "2fior6770hvto4u6kuq084j7fu";
      let identity_pool_id = "us-west-2:2e58c36f-a443-401e-bf6a-23d9142041d7";

     console.log('UserPoolId :', this.user_pool_id);
     console.log('ClientId :', client_id);
     var data = {
       UserPoolId: this.user_pool_id,
       ClientId: client_id,
     };
     // AWS.config.region = region;
     // console.log("inside else");
     // let LOGIN = {};
     // LOGIN[`cognito-idp.${AWS.config.region}.amazonaws.com/${data['UserPoolId']}`] = token;
     // console.log('LOGIN', LOGIN);
     // AWS.config.region = region;
     // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
     //   IdentityPoolId : identity_pool_id,
     //   Logins : LOGIN,
     // });
    console.log('You are now logged in.');
    let login = {}
    let issl = this.iss.substring(this.iss.indexOf("cognito"))
    login[issl] = this.token.value
    //Configuring the AWS SDK credentials
    AWS.config.credentials =  new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-west-2:2e58c36f-a443-401e-bf6a-23d9142041d7",
        Logins: login
    });
    AWS.config.update({
        'region': 'us-west-2'
    })
   }



   getDynamoComments(){
     console.log("inside getDynamoComments");
     let returnval;
     let userid = AWS.config.credentials.identityId
     let ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
     console.log("userid :", userid);
     var params = {
       TableName: 'summer_webdev_amdelaur_users',
       Key: {
         'userid': {S: userid},
         'username': {S: this.name}
       },
     };

     let putObjectPromise = ddb.getItem(params).promise();
     putObjectPromise.then(function(data) {
       console.log('Success :', data.Item);
         this.showComments(data.Item);
     }).catch(function(err) {
       console.log(err);
     });

   }


   showComments(comment_obj){
     let comments = comment_obj['comment']['SS']
     console.log('comments :', comments);
     let commstr = '';
     for (var i = 0; i < comments.length; i++){
       console.log("comment[i] :", comments[i]);
       commstr += comments[i] + ", ";
     }
     let temp = document.getElementById("name");
     if (temp === null){
       createDiv("name");
     }
     document.getElementById("name").innerHTML = "<br><b>Current Comments :</b><br>" + "<br>" + commstr
   }


   updateDynamo(){
      let comment = document.getElementById("Input").value;
      console.log("name : ", this.name);
      console.log("comment : ", comment);
      let userid = AWS.config.credentials.identityId
      console.log('userid', userid);
      let ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
      var params = {
       TableName: 'summer_webdev_amdelaur_users',
       Key: {
         'userid': {S: userid},
         'username': {S: this.name}
       },
       AttributeUpdates:{
         'comment': {
           "Action": 'ADD',
           "Value":{SS: [ comment ]},
         }
       }
     };

     // Call DynamoDB to add the item to the table
     ddb.updateItem(params, function(err, data) {
       if (err) {
         console.log("Error", err);
       } else {
         console.log("Success", data);
       }
     });

     this.getDynamoComments();
   }
}
