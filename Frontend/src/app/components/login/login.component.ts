import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { HttpService } from 'src/app/services/http-service.service';
import { ProfileService } from "../../services/profile-service.service";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profile: any;
  subscription: Subscription = new Subscription;
  allStocks = [];
  stocksSubscription: Subscription = new Subscription;
    
  ssn = ''
  place: string="XXX-XX-XXXX"

  constructor(
    private profileService: ProfileService,
    private router: Router
    ){}
  

  ngOnInit() { 
    this.subscription = this.profileService.currentProfile.subscribe(
      profile => this.profile = profile
    )
    this.stocksSubscription = this.profileService.currAllStocks.subscribe(
      allStocks => this.allStocks = allStocks
    )
    console.log("Initialilly profile = " + this.profile.name +", "+this.profile.SSN);
    console.log("All stocks " + this.allStocks[0])
  }

  loginUser(){
    this.profileService.changeProfile(this.ssn);
    // console.log("New Profile " + this.profile.name +", "+this.profile.SSN)
    this.router.navigate(['/portfolio']);
  }
}
