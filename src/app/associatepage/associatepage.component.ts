import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/login/login.service';
import { AssociatepageService } from './associatepage.service';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { RouterModule, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
	selector: 'app-associatepage',
	templateUrl: './associatepage.component.html',
	styleUrls: ['./associatepage.component.sass']
})
export class AssociatepageComponent implements OnInit {
	activeBtn : boolean;
	list_id_Pages: any;
	dataSended: boolean;
	listFanpages: any = [{
		url: ''
	}];
	renderList: boolean = false;

	constructor(private _sanitizer: DomSanitizer,  private router: Router,private loginService : LoginService, private associateService: AssociatepageService) {
		this.activeBtn = false;
		this.dataSended =  false;
	}

	ngOnInit() {
		let dataCompleteFanPages = [];
		this.associateService.getFanpagesFromFb().then(
			(res) => {
				this.listFanpages = this.getPictureFanPage(res.data)
				this.renderList = true;
			}
		)
		 this.list_id_Pages = this.getId_FanPages_Winged()
	}

	getPictureFanPage(listPages){
		let resultObservables : any = [];
		for (var i = 0; i < listPages.length; i++) {
			let page_id = listPages[i].id;
			let page_token = listPages[i].access_token;
			let page_name = listPages[i].name;

			let httpMap = this.loginService.getDataOneFanPage(listPages[i].id,  listPages[i].access_token)
			httpMap.then(
				(res) => {
					resultObservables.push({
						'url':res.data.url, 
						'pageId' : page_id,
						'token': page_token,
						'description': page_name
					})
				}
			).catch( err => console.log(err))

		}
		return resultObservables
	}

	getId_FanPages_Winged() {
		let idFanPages = []
		this.associateService.getPagesSubscribedFromApi().subscribe(
			(result:any) => {
				for (var i = 0; i < result.length; i++) {
					idFanPages.push(result[i].pageId)
				}
				this.activeBtn = true;
			})
		return idFanPages
	}

	checkStatus(idPage){
		if (this.list_id_Pages.length == 0) {
			return  true
		} else {
			let result = this.list_id_Pages.filter(id => id === idPage);
			if (result.length == 0) {
				return true 
			}else{
				return false
			}
		}
	}
	
	associatePage(dataPage){
		this.dataSended =  true;
		this.associateService.setPageFbAssociate(dataPage)
	}

}
