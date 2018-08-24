import { Injectable, Input , Output, EventEmitter } from '@angular/core';
import { FacebookService, LoginResponse, LoginOptions, InitParams } from 'ngx-facebook';
import { AppConstant } from '../app.constant';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AssociatepageService  {

	pageSelected:any;
	pagesAsociated: any;
	consFb : any;
	appCons: any;
	loginServiceData : any;
	fanPageChange: EventEmitter<any> = new EventEmitter();
	loginRespDataWing: any;
	fbPictureFanpages: any = [];
	fbUserPages: any;

	constructor(private fb: FacebookService,
		private appConstant: AppConstant,
		private router: Router,
		private http: HttpClient) { 
		this.pagesAsociated = [];
		this.appCons =  this.appConstant.getConstantApp();
		this.loginRespDataWing =  this.getDataSession();
	}

	getDataUserFbWinged(){
		return this.loginRespDataWing
	}

	emitNavChangeEvent(dataPage) {
		this.fanPageChange.emit(dataPage);
	}

	getNavChangeEmitter() {
		return this.fanPageChange;
	}

	getDataSessionFromFb(){
		return JSON.parse(sessionStorage.getItem('userFb'))
	}

	getPagesSubscribedFromApi() {
		if (this.loginRespDataWing == null) {
			this.loginRespDataWing = this.getDataUserFbWinged()
		}
		return this.http.get(this.appCons.apiPathPage+'?userFacebookId='+this.loginRespDataWing.userFacebookId)
	}

	getPageSelected() {
		return this.pageSelected;
	}

	getPagesAssociated(){
		return this.pagesAsociated;
	}

	getPagesAssocietedStorage(){
		return JSON.parse(sessionStorage.getItem('pagesAssocieted')) 
	}

	// get data sesion from user faceboook
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

	getFanpagesFromFb() {
		let dataUserFromWing  = this.getDataUserFbWinged()
		console.log('user -token api/login'+ dataUserFromWing.access_token)
		return this.fb.api('/'+dataUserFromWing.userFacebookId+'/accounts' , 'get', {access_token:dataUserFromWing.access_token})
	}

	setPageFbAssociate(dataPage){
		this.pageSelected =  dataPage;
      
		this.fb.api('/'+dataPage.pageId+'/subscribed_apps', 'post', 
			{ access_token: dataPage.token }).then(
			response => {
              console.log("000");
				if (response.success){
                  console.log("111");
					this.setPageAssociateToWinged(dataPage).subscribe(
						(resp_post_pages) => {
                          console.log("222");
								this.savePagesAssocietedStorage(dataPage)
								this.router.navigate(['/', 'suscriptores']).then(nav => {

								}, err => {
								    console.log(err) // when there's an error
								});
						})
				}
			})
			.catch(e => console.log('Error subscribed apps'))
	}

	setPageAssociateToWinged(dataPage){
		let longTokenUser = this.getDataUserFbWinged()
		return this.http.post(this.appCons.apiPathPage+'?userFacebookId='+this.loginRespDataWing.userFacebookId,{
			"pageid":  dataPage.pageId,
			"description": dataPage.description,
			"token": dataPage.token	
		})
	}

	savePagesAssocietedStorage(dataPage){
		let data_in_storage = this.getPagesAssocietedStorage()
		if (data_in_storage !=  null) {
			this.removePagesAssocieted()
			sessionStorage.setItem('pagesAssocieted', JSON.stringify(dataPage))
		}else{
			sessionStorage.setItem('pagesAssocieted', JSON.stringify(dataPage))
		}		 
	}

	setDataUserFbWinged(data){
		this.loginRespDataWing = data
	}

	removePagesAssocieted(){
		sessionStorage.removeItem('pagesAssocieted');
	}

}
