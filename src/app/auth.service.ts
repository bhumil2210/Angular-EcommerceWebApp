import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable,of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './models/app-user';

import { map, switchMap } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  
  constructor(private afAuth: AngularFireAuth,
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService) {
    this.user$ = afAuth.authState;
   }

  login(){

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);

    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((result)=>{
      console.log("Logged in successfully"+result);

      this.userService.save(result.user);

      let redirectUrl = localStorage.getItem('returnUrl');
      this.router.navigateByUrl(redirectUrl);

    }).catch((error)=>{
      console.log(error);
    })
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$
    .pipe(switchMap(user => {
      if(user) return this.userService.get(user.uid).valueChanges();
      
      return of(null);
    }));
  }
}
