import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserModel } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private key = 'AIzaSyBXYUKiN8Iw5CoJod9W5RfXTPuD-pDWO7o';
  userToken: string;

// Crear nuevo usuario
  // url + signUp?key=[API_KEY]


// Iniciar sesion
  // url + signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) { }

  logout(){

  }
  
  
  login(user:UserModel){

    const authData={
      email: user.email,
      password: user.pass,
      returnSecureToke: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.key}`,
      authData
    );

  }
  
  
  newUser(user:UserModel){

    const authData={
      email: user.email,
      password: user.pass,
      returnSecureToke: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.key}`,
      authData
    );

  }

  private saveToken (idToken: string){

    this.userToken = idToken
    localStorage.setItem('token', idToken);
  }

}
