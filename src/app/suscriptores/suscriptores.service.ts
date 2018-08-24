import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { map } from "rxjs/operators";
import { Suscriptores } from "./suscriptores";
import { AppConstant } from '../app.constant';
import { AssociatepageService } from '../associatepage/associatepage.service';


@Injectable()
export class SuscriptoresService {

	urlGet : string;
	constructor(private http: HttpClient, private appConstant: AppConstant, private associateService: AssociatepageService) {
		let dataFace = this.appConstant.getConstantFace();
		this.urlGet =  dataFace.listSubscribers;
	}

	getData(page) {
		return this.http.get(this.urlGet+'?pageId='+page.pageId+'&pageToken='+page.token)
	}
}
