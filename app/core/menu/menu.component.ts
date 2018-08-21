import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { LoginService } from '../login/login.service';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { RouterModule, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AssociatepageService } from '../../associatepage/associatepage.service';


@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.sass'],
	providers: []
})
export class MenuComponent implements OnInit {

	listFanpages: any[];
	profilePicture: any;
	picturePageSelected: any;
	namePageSelected: string;
	isEmptyPageSelected: boolean;

	dataPageInStorage: any;
	dataPagetoSave:any = {
		pageId : 0,
		token: ''
	};

	story: string;

	constructor(private associatePage: AssociatepageService, private fb: FacebookService, private loginService: LoginService, private router: Router, private _sanitizer: DomSanitizer ) { 
		this.listFanpages = []
	}

	selectedNavItem(item: number) {
	    this.associatePage.emitNavChangeEvent(item);
	}

	ngOnInit() {
		let pageinStorage = this.associatePage.getPagesAssocietedStorage()

		if (pageinStorage !=  null) {

			this.namePageSelected = pageinStorage.description;
			this.loginService.getDataOneFanPage(pageinStorage.pageId, pageinStorage.token).then(
				(data) => {
					this.picturePageSelected =  data.data.url
				})
		}

		this.associatePage.getPagesSubscribedFromApi().subscribe(
			(dataPages:any) => {
				let firstPicFanPage = "";
				let pageId : 0;
				let pageToken: '';
				let fanPageSelected = []

				if (dataPages.length == 0) {
					this.picturePageSelected = "./assets/images/profile_photo_icon.png";
					this.namePageSelected = "Your Fanpage";
				} else {
					if (pageinStorage === null) {

						this.namePageSelected = dataPages[0].description;
						this.dataPagetoSave = {
							pageId: dataPages[0].pageId,
							token: dataPages[0].token,
							description: dataPages[0].description
						}

						this.associatePage.savePagesAssocietedStorage(this.dataPagetoSave)
						fanPageSelected = this.dataPagetoSave;
					}else{
						fanPageSelected = pageinStorage;
					}

					// GET PICTURES TO EVERY FANPAGES AND SELECT FIST BY DEFAULT
					for (let i = 0; i < dataPages.length; i++) {
						this.loginService.getDataOneFanPage(dataPages[i].pageId, dataPages[i].token).then(
							(data) => {
								dataPages[i]['url']	 =  data.data.url;
								if (i == 0 ) {
									if (pageinStorage === null) {
								 		this.picturePageSelected = data.data.url
								 	}
								}
							})
					}
					this.associatePage.emitNavChangeEvent(fanPageSelected);
					this.listFanpages = dataPages;
				}
		})
	}

	sanitizeImage(image: string) {
		return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
	}

	loadPage(page){
		this.associatePage.savePagesAssocietedStorage(page)
		this.associatePage.emitNavChangeEvent(page);
		this.namePageSelected = page.description;
		this.loginService.getDataOneFanPage(page.pageId, page.token).then(
			(data) => {
				this.picturePageSelected =  data.data.url
			})
	}

	closeSession() {
		this.loginService.removeSession();
		this.router.navigateByUrl("/");
	}
}

