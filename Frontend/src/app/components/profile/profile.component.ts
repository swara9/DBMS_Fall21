import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ssn:string='';

  constructor(private httpClient:HttpClient) { 
  }
  onNameKeyUp(event:any){
    this.ssn=event.target.value;
  }

getProfile(){
  this.httpClient.get('http://localhost:8080/getUser?SSN=${this.ssn}').
  subscribe(
    (data:any )=>{
      console.log(data);
    }
  )
}
  ngOnInit(): void {

  }

}
