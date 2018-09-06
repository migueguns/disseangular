import { Component } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';

export class AppConstant {
	
  getConstantFace() {
    let url = "https://dimebot.azurewebsites.net/"
		return {
			url: url,
			appFaceId: '213251205974324',
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
      url: url,
      logoWinged: './assets/images/logo-winged-app.png',
      apiPathLogin: url + 'api/login',
      apiPathPage: url + 'api/page'

    }
  }

}
