import { Injectable, Input , Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FacebookService, LoginResponse, LoginOptions, InitParams } from 'ngx-facebook';
import { Observable } from 'rxjs';
import { AppConstant } from '../../app.constant';
import { Router } from "@angular/router";
import { AssociatepageService } from "../../associatepage/associatepage.service";

const options: LoginOptions = {
	//scope: 'public_profile,user_friends,email,pages_show_list',
  scope: 'public_profile,email,manage_pages,pages_messaging,pages_messaging_subscriptions',
	return_scopes: true,
	enable_profile_selector: true
};

@Injectable({
	 providedIn: 'root'
})
export class LoginService {

	idFaceApp: number;
	consApp : any;
	consFb : any;
	fbData: any;
	fbUserId: any;
	fbToken: any;
	fbPictureFanpages: any = [];

	constructor(private fb: FacebookService, 
		private appConstant: AppConstant,
		private router: Router,
		private http: HttpClient,
		private associatepageService: AssociatepageService) {

		this.consFb  =  this.appConstant.getConstantFace();
		this.consApp = this.appConstant.getConstantApp();

		let initParams: InitParams = {
			appId: this.consFb.appFaceId,
			xfbml: true,
			version: 'v3.0'
		};
		
		fb.init(initParams);
	}

	loginWithFacebook(): void {
		this.fb.login(options)
		.then((response: LoginResponse) => {
			this.getDataFromFacebook(response.authResponse.accessToken)		
		})
		.catch(e => console.error('Error logging in'));
	}

	getDataFromFacebook(token){
		this.fb.api('/me?fields=id,name,first_name,picture,email').then(
			(respFace: any) => {
				let dataToken = {'tokenUser': token}
				Object.assign(respFace, dataToken);

				this.setUserToApiLoginWinged(respFace).subscribe(
					(dataUserFb:any) => {
						// save data returned from api winged
						this.saveDataSession(dataUserFb.user)
						console.log('user -token api/login'+dataUserFb.user.access_token)
						this.associatepageService.setDataUserFbWinged(dataUserFb.user)

						this.router.navigate(['/', 'suscriptores']).then(nav => {
						}, err => {
						    console.log(err) // when there's an error
						});
					}
				)
			},
			(error: any) => console.error(error)
			);
	}

	getDataOneFanPage(idfacePage, token){
		return this.fb.api('/'+ idfacePage +'/picture', 'get', {"redirect": "0" })
	}


	getDataSession() {
		let readCookie = (name) => {
			let nameEQ = name + "=";
			let ca = document.cookie.split(';');
			for(let i=0;i < ca.length;i++) {
				let c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return  JSON.parse(c.substring(nameEQ.length,c.length));
			}
			return null;
		}

		return readCookie('login');
	}

  setUserToApiLoginWinged(userData) {

		let apiPost = this.appConstant.getConstantApp()
		return this.http.post(apiPost.apiPathLogin+'?userid='+userData.id+'&accessToken='+userData.tokenUser,{
			access_token: userData.tokenUser,
			userid: userData.id
          })


 //   let apiPost = this.appConstant.getConstantApp()
 //     return this.http.get(apiPost.apiPathLogin + '?userid=' + userData.id + '&accessToken=' + userData.tokenUser)
	}
	
	getPictureFanPage(){
		return this.fbPictureFanpages;
	}

	saveDataSession(user){
		document.cookie =  "login="+JSON.stringify(user);
	}

	removeSession(){
		sessionStorage.removeItem('fanPages');
		this.associatepageService.removePagesAssocieted()
		let delete_cookie = function(name) {
			document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		};
		delete_cookie('login');
	}

}
