import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../services/http-service.service';

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

  defaultSSN = '1029384756';
  private ssn = new BehaviorSubject('1029384756');
  currentSSN = this.ssn.asObservable();

  private profile = new BehaviorSubject(this.defaultProfile);
  currentProfile = this.profile.asObservable();

  private allStocks = new BehaviorSubject([]);
  currAllStocks = this.allStocks.asObservable();

  private name = new BehaviorSubject(this.defaultProfile);
  currName = this.name.asObservable();


  constructor(private http: HttpService) {
      this.http.getUserProfile(this.defaultSSN)
        .subscribe(newProfile => {
          this.profile.next(newProfile);
      });

      this.http.getAllStocks()
        .subscribe(allStocks => {
          this.allStocks.next(allStocks);
        })
  }

  changeProfile(ssn: string){
    this.http.getUserProfile(ssn)
        .subscribe(newProfile => {
          this.profile.next(newProfile);
          console.log("New profile is set");
        });    
  }

  setAllStocks(){

  }
}


