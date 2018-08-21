import { Component, OnInit, Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { FacebookService, LoginResponse, LoginOptions, InitParams } from 'ngx-facebook';
import { AppConstant } from '../../app.constant'
import { Router } from "@angular/router";
import { AppComponent } from '../../app.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
	providers: [AppConstant]
})
@Injectable()
export class LoginComponent {
	

	fbData : any;
	fbUserPages:  any = {};
	pathLogo:string;

	constructor(private fb: FacebookService, 
		private loginService: LoginService, 
		private appConstant: AppConstant,
		private router: Router ) { 
		let consApp = this.appConstant.getConstantApp();
		this.pathLogo = consApp.logoWinged
	}

	loginWithFacebook(): void {
		this.loginService.loginWithFacebook()
	}

}