import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  // login Methode
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res:any) => {
        localStorage.setItem('token', 'true');

        if(res.user?.emailVerified == true){
          this.router.navigate(['/dashboard']);
        } else{
          this.router.navigate(['/verify-email']);
        }
      },
      (err) => {
        alert('something went wrong');
        this.router.navigate(['/login']);
      }
    );
  }

  // register Methode

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res:any) => {
        alert('registration is successfull');
        this.router.navigate(['/login']);
        this.sendEmailForVerification(res.user);
      },
      (err) => {
        alert('something went wrong');
        this.router.navigate(['/register']);
      }
    );
  }

  // login  Methode

  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err);
      }
    );
  }

  // Forget password

  forgetPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-emil']);
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }

  sendEmailForVerification(user: any) {
    user.sendEmailVerification().then(
      (req:any) => {
        this.router.navigate(['/verify-emil']);
      },
      (err:any) => {
        alert('something went wrong, not able to send email');
      }
    );
  }
}
