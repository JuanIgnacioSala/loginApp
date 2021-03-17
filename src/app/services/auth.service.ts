import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from "rxjs/operators";

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

  constructor( private http: HttpClient) { 
    this.readToken();
  }

  logout(){
    localStorage.removeItem('token');
  }
  
  
  login(user:UserModel){

    const authData={
      email: user.email,
      password: user.pass,
      returnSecureToke: true
    };

   
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.key}`, 
      authData).pipe(
        map(resp => {
          this.saveToken(resp['idToken']);
          return resp;
        })
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
    ).pipe(
      map(resp => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    );

  }

  private saveToken (idToken: string){
    this.userToken = idToken
    localStorage.setItem('token', idToken);
    
    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString())
  }

  private readToken (){
    if (  localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken='';
    }
      return this.userToken;
  }

  isAutenticated(): boolean{

    if (this.userToken.length < 2) {
      return false;
    } 

    const expira = Number( localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date() ) {
      return true;
    } else{
      return false;
    }

    return this.userToken.length > 2;
  }

}
