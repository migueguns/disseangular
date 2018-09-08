import { Component, OnInit, Inject } from '@angular/core';
import { AppModule } from '../app.module';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AppConstant } from '../app.constant';
import { AssociatepageService } from '../associatepage/associatepage.service';

@Component({
	selector: 'app-crecimiento',
	templateUrl: './crecimiento.component.html',
	styleUrls: ['./crecimiento.component.sass'],
	providers: [AppConstant, AssociatepageService]
})
export class CrecimientoComponent implements OnInit {
	appFaceId:string;
	step = 0;

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}

	constructor(private dialog: MatDialog,
		private appConstant: AppConstant) { 
		let consApp = this.appConstant.getConstantFace();
		this.appFaceId = consApp.appFaceId;
	}

	openDialog(titulo, seccion) {
		var selectedSeccion = seccion;
		var selectedTitulo = titulo;
		const dialogRef = this.dialog.open(CrecimientoDialog,{
			data : {
				seccion : selectedSeccion,
				titulo : selectedTitulo
			}
		});
	}

	ngOnInit() {
	}
}

@Component({
	selector: 'crecimiento-dialog',
	templateUrl: 'crecimiento-dialog.component.html',
	styleUrls: ['crecimiento-dialog.component.sass'],
	providers: [AppConstant, AssociatepageService]
})

export class CrecimientoDialog {
	appFaceId:string;
	url:string;
	pageSelected:string;

	constructor(
		public dialogRef: MatDialogRef<CrecimientoDialog>, 
		@Inject(MAT_DIALOG_DATA) public data: any,
		private appConstant: AppConstant,
		private associatePage: AssociatepageService) { 
		let consApp = this.appConstant.getConstantFace();
		this.appFaceId = consApp.appFaceId;
		this.pageSelected = associatePage.getPagesAssocietedStorage();
		this.url = consApp.url;
	}

}
