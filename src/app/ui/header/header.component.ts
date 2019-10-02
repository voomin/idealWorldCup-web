import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faUser, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faPlusSquare = faPlusSquare;
  constructor(
    public authService: AuthService
    ) { }

  ngOnInit() {
  }

}
