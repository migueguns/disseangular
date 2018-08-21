import { Component, ViewChild, AfterViewInit, OnInit, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { HeaderComponent } from './core/header/header.component';
import { LoginService } from './core/login/login.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers: [LoginService]
})
export class AppComponent implements OnInit {
	pageName: any;
	endPageName: number;
	userLogged: boolean = false;
	
	constructor(private router: Router, private loginService: LoginService )  {

		router.events.subscribe((config:any) => {
			this.pageName = config.url;

			if (this.loginService.getDataSession() != null ) {
				this.userLogged =  true;
				if (this.pageName === "/") {
					 this.router.navigate(['/', 'suscriptores']).then(nav => {
								    location.reload();
								  }, err => {
								    console.log(err) // when there's an error
								  });
				}
			}else{
				this.userLogged = false;
			}
		});
	}

	filterByPage(page) {

		if (page === 'login') {
			if (this.pageName == '/' || this.userLogged === false ) {
				return true
			}
		}else{
			if (page == 'main') {
				if (this.pageName != '/' && this.userLogged === true) {
					return true
				}
			}
			if (page == 'menu') {
				if (this.pageName == '/associate') {
					return false
				}else{
					if (this.pageName != '/' && this.userLogged === true) {
						return true
					}
				}
			}
		}


	}

	ngOnInit(){

	}
}


