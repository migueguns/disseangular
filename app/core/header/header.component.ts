import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../core/login/login.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
	providers: [LoginService]
})
export class HeaderComponent implements OnInit {
	userName: string;
	userPictureProfile: string;

	constructor(private loginService: LoginService) { 
		
	}



	ngOnInit() {

	}


}
