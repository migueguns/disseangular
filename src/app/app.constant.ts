import { Component } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';

export class AppConstant {
	
  getConstantFace() {
    let url = "https://dimebot.azurewebsites.net/"
		return {
			appFaceId: '159284631531779',
			listSubscribers : url + 'api/subscriptors'
		}
	}

	getConstantLogin() {
		return {
			loginInit: false
		}
	}

  getConstantApp() {

    let url = "https://dimebot.azurewebsites.net/"
    return {
      logoWinged: './assets/images/logo-winged-app.png',
      apiPathLogin: url + 'api/login',
      apiPathPage: url + 'api/page'

    }
  }

}
