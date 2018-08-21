import { Component, OnInit, Inject } from '@angular/core';
import {AppModule} from '../app.module';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-crecimiento',
	templateUrl: './crecimiento.component.html',
	styleUrls: ['./crecimiento.component.sass']
})
export class CrecimientoComponent implements OnInit {
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

	constructor(private dialog: MatDialog) { }

	openDialog(seccion) {
		var selectedSeccion = seccion;
		const dialogRef = this.dialog.open(CrecimientoDialog,{
			data : {
				seccion : selectedSeccion
			}
		});
	}

	ngOnInit() {
	}
}

@Component({
	selector: 'crecimiento-dialog',
	templateUrl: 'crecimiento-dialog.html',
	styleUrls: ['crecimiento-dialog.sass']
})

export class CrecimientoDialog {

	constructor(
		public dialogRef: MatDialogRef<CrecimientoDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

}
