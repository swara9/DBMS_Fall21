import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http :HttpService ) { }

  ngOnInit(): void {

    this.http.getAll()
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }

  navigateToStocks(){
    
  }

}
