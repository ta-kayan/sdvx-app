import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// 以下追加したもの
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './../models/user';


@Injectable()
export class AuthService {
  user: Observable<User | null>;
  public uid;
  // public credential;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.user = this.afAuth.authState
      .pipe(switchMap(user => {
        if (user) {
          this.uid = user.uid
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.updateUserData(user.user);
      })
      .catch(err => console.log(err));
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        return this.updateUserData(user.user);
      })
      .catch(err => console.log(err));
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        console.log(credential.user);
        //return this.updateUserData(credential.user);
        return credential.user;
      })
      .catch(err => console.log(err));
  }

  private updateUserData(user: User) {
    const docUser: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);
    console.log(user);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      profile: user.profile || '',
      skill: user.skill || '',
      name: user.name || '',
      twitterId: user.twitterId || '',
      sdvxId: user.sdvxId || ''
    };
    return docUser.set(data);
  }

  putUserData(user, updateData) {
    const docUser: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      profile: user.profile || '',
      skill: updateData.skill || '',
      name: updateData.name || '',
      twitterId: updateData.twitterId || '',
      sdvxId: updateData.sdvxId || ''
    };
    return docUser.set(data);
  }

}