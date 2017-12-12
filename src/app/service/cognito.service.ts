import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';

@Injectable()
export class CognitoService {

  private userPool: CognitoUserPool;
  private poolData: any;
  public cognitoCreds: AWS.CognitoIdentityCredentials;

  constructor() {
    AWS.config.region = environment.region;
    this.poolData = { UserPoolId: environment.userPoolId, ClientId: environment.clientId };
    this.userPool = new CognitoUserPool(this.poolData);
  }

  login(username: string, password: string): Promise<any> {
    const userData = {
      Username: username,
      Pool: this.userPool,
      Storage: localStorage
    };
    const cognitoUser = new CognitoUser(userData);
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          alert('LogIn is success!');
          console.log('id token + ' + result.getIdToken().getJwtToken());
          console.log('access token + ' + result.getAccessToken().getJwtToken());
          console.log('refresh token + ' + result.getRefreshToken().getToken());
          resolve(result);
        },
        onFailure: function (err) {
          alert(err);
          console.log(err);
          reject(err);
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          delete userAttributes.email_verified;
          delete userAttributes.phone_number_verified;
          cognitoUser.completeNewPasswordChallenge('NewPassword', userAttributes, this);
        }
      });
    });
  }

  isAuthenticated(): Promise<any> {
    const cognitoUser = this.userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser === null) { reject(cognitoUser); }
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
        } else {
          if (!session.isValid()) {
            reject(session);
          } else {
            resolve(session);
          }
        }
      });
    });
  }

  getCurrentUserIdToken(): any {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          alert(err);
          return;
          } else {
          return session.getIdToken().getJwtToken();
          }
        });
      }
    }

  logout() {
    console.log('LogOut!');
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
  }
}
