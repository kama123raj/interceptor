import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  email:string ='';
  password:string ='';

  constructor(private auth:AuthService){}

  register(){
    if(this.email ==''){
      alert('enter all the values');
      return;
    }
    if (this.password == ''){
      alert('enter all the values');
      return;
    }

    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }


}
