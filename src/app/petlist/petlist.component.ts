import { Component, OnInit } from '@angular/core';

import { Pet } from '../pet';
import { PETS } from '../mock-pet';

import { PetService } from '../service/pet.service';
import { Router } from '@angular/router';
import { CognitoService } from '../service/cognito.service';

@Component({
  selector: 'app-petlist',
  templateUrl: './petlist.component.html',
  styleUrls: ['./petlist.component.css']
})
export class PetlistComponent implements OnInit {
  // pets = PETS;
  pets: Pet[];

  constructor(
    private router: Router,
    private cognito: CognitoService,
    private petService: PetService) {
    this.cognito.isAuthenticated()
      .then(res => console.log(res))
      .catch((err) => {
        return console.log(err) || this.router.navigate(['/login']);
      });
  }

  ngOnInit() {
    this.getPets();
  }


  getPets(): void {
    this.petService.getPets()
      .subscribe(pets => this.pets = pets);
  }
  onClickLogout() {
    this.cognito.logout();
    this.router.navigate(['/login']);
  }
}
