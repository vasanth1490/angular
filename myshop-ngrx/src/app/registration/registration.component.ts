import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserWithCred } from '../models/user-with-cred';
import { User } from '../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: UserWithCred = {
    name: '',
    username: '',
    email: '',
    password: ''
  };
  showSpinner: boolean = false;
  isRegSuccess: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  register(): void {
    this.showSpinner = true;
    this.dataService.addUser(this.user).subscribe(
      (data: User) => {
        console.log(data);
        this.showSpinner = false;
        this.isRegSuccess = true;
      }
    );
  }



}