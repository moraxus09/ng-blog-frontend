import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: Observable<User>;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUser();
  }

}
