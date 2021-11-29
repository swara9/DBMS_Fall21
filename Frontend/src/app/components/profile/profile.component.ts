import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  callStockHistory(){
    var isin = 'US0185811082';
    this.http.getStockHistory(isin)
    .subscribe(data => console.log(data));
  }
}
