import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from "../../services/profile-service.service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profile: any;
  subscription!: Subscription;

  constructor(private profileService: ProfileService) { }


  ngOnInit(): void {
    this.subscription = this.profileService.currentProfile.subscribe(
      profile => this.profile = profile
    )
    console.log("Current User = " + this.profile.name)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
