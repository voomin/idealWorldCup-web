import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData:User;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public ngZone: NgZone // NgZone service to remove outside scope warning
    ) { 
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          //localStorage.setItem('user', JSON.stringify(this.userData));
          //JSON.parse(localStorage.getItem('user'));
        } else {
          this.userData = null;
          //localStorage.setItem('user', null);
          //JSON.parse(localStorage.getItem('user'));
        }
      });
    }
    GoogleAuth() {
      return this.AuthLogin(new auth.GoogleAuthProvider());
    }  
    private AuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          //this.router.navigate(['dashboard']);
        });
        //this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
    }
    SignOut() {
      return this.afAuth.auth.signOut().then(() => {
        //localStorage.removeItem('user');
        //this.router.navigate(['sign-in']);
      });
    }
}
