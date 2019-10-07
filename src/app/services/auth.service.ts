import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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
          // this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          localStorage.setItem('user', JSON.stringify(this.userData));
          // JSON.parse(localStorage.getItem('user'));
        } else {
          this.userData = null;
          localStorage.setItem('user', null);
          //JSON.parse(localStorage.getItem('user'));
        }
      });
    }
    public getUserDataORNull(){
      const user: User = JSON.parse(localStorage.getItem('user'));
      return user;
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
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
    }
    private SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      };
      return userRef.set(userData, {
        merge: true
      });
    }
    setMakingTrackId(makingTrackId: string){
      const user = this.getUserDataORNull();
      if (!user) {
        return;
      }
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      return userRef.set({
        makingTrackID: makingTrackId
      }, {
        merge: true
      });
    }
    SignOut() {
      return this.afAuth.auth.signOut().then(() => {
        localStorage.removeItem('user');
        //this.router.navigate(['sign-in']);
      });
    }
}
