import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  defaultProfile = {
    'SSN': '123456789',
    'name' : 'Swara',
    'funds' : 30000,
    'netPL' : 3500,
    'totalInv' : 15000,
    'currValue' : 18500
  }

  private profile = new BehaviorSubject(this.defaultProfile);
  currentProfile = this.profile.asObservable();

  constructor() { }

  changeProfile(newProfile: any){
    this.profile.next(newProfile);
  }
}


