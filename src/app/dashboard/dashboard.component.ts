import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../service/cognito.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private cognito: CognitoService) {
    this.cognito.isAuthenticated()
      .then(res => console.log(res))
      .catch((err) => {
        return console.log(err) || this.router.navigate(['/login']);
      });
  }

  ngOnInit() {
  }


  onClickLogout() {
    this.cognito.logout();
    this.router.navigate(['/login']);
  }

}
