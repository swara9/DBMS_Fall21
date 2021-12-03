import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  defaultProfile = {
      "SSN": "1029384756",
      "net_profit_loss": 144.20000000000002,
      "totalInv": 6,
      "currentValue": 150.20000000000002,
      "funds": 2000,
      "portfolio": [
          {
              "symbol": "AAPL",
              "qty": 3,
              "avg_price": 161.02
          },
          {
              "symbol": "BKNG",
              "qty": 2,
              "avg_price": 2935.14
          },
          {
              "symbol": "BSX",
              "qty": 2,
              "avg_price": 45.46
          },
          {
              "symbol": "CSCO",
              "qty": 5,
              "avg_price": 54.6
          },
          {
              "symbol": "HP",
              "qty": 15,
              "avg_price": 39.49
          },
          {
              "symbol": "EBAY",
              "qty": 6,
              "avg_price": 21.89
          }
      ]
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
        });
  }

  changeProfile(ssn: string){
    this.http.getUserProfile(ssn)
        .subscribe(newProfile => {
          this.profile.next(newProfile);
          console.log("New profile is set");
        });    
  }

}


