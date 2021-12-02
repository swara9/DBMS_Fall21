import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 /* encapsulation: ViewEncapsulation.None*/
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }
  
  loginUserData={}
  place: string="XXX-XX-XXXX"

  constructor(private _auth:HttpService){}

  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

 

}
