import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { SuscriptoresService } from './suscriptores.service';
import { Suscriptores } from './suscriptores';
import { FormsModule } from "@angular/forms";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AssociatepageService } from '../associatepage/associatepage.service';

@Component({
	selector: 'app-suscriptores',
	templateUrl: './suscriptores.component.html',
	providers: [SuscriptoresService, Suscriptores, BsModalService]
})
export class SuscriptoresComponent implements OnInit {

	modalRef: BsModalRef;
	isModalShown: boolean = false;
	dataResult : any;

	listSuscriptores : any;
	columns:Array<any> = this.TableDataSuscriptores.getColumns();
	rows : any;

	page = 1;
	itemsPerPage:number = 8;
	maxSize:number = 6;
	numPages:number = 1;
	length:number = 0;

	data:Array<any>;
	dataTest:Array<any>;
	subscription: any;

	config:any = {
		paging: true,
		sorting: {columns: this.columns},
		filtering: {filterString: ''},
		className: ['table-suscription']
	};

	constructor( private suscriptoresService : SuscriptoresService, 
		private TableDataSuscriptores :  Suscriptores, 
		private modalService: BsModalService,
		private associateService : AssociatepageService) {
		this.listSuscriptores = []
	}

	ngOnInit() {
		this.subscription = this.associateService.getNavChangeEmitter()
		.subscribe(item => this.getData(item));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	getData(page){
		this.suscriptoresService.getData(page).subscribe(
			(data) => {
				this.data = this.TableDataSuscriptores.getRows(data);
				if (this.data != null) {			
					this.length = this.data.length;
					this.onChangeTable(this.config);
				}
			})
	}

	public changePage(page:any, data:Array<any> = this.data):Array<any> {
		let start = (page.page - 1) * page.itemsPerPage;
		let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
		return data.slice(start, end);
	}

	public changeSort(data:any, config:any):any {
		if (!config.sorting) {
			return data;
		}

		let columns = this.config.sorting.columns || [];
		let columnName:string = void 0;
		let sort:string = void 0;

		for (let i = 0; i < columns.length; i++) {
			if (columns[i].sort !== '' && columns[i].sort !== false) {
				columnName = columns[i].name;
				sort = columns[i].sort;
			}
		}

		if (!columnName) {
			return data;
		}

		return data.sort((previous:any, current:any) => {
			if (previous[columnName] > current[columnName]) {
				return sort === 'desc' ? -1 : 1;
			} else if (previous[columnName] < current[columnName]) {
				return sort === 'asc' ? -1 : 1;
			}
			return 0;
		});
	}

	public changeFilter(data:any, config:any):any {
		let filteredData:Array<any> = data;

		this.columns.forEach((column:any) => {
			if (column.filtering) {
				filteredData = filteredData.filter((item:any) => {
					return item[column.name].match(column.filtering.filterString);
				});
			}
		});

		if (!config.filtering) {
			return filteredData;
		}

		if (config.filtering.columnName) {
			return filteredData.filter((item:any) =>
				item[config.filtering.columnName].match(this.config.filtering.filterString));
		}

		let tempArray:Array<any> = [];
		filteredData.forEach((item:any) => {
			let flag = false;
			this.columns.forEach((column:any) => {
				if (item[column.name].toString().match(this.config.filtering.filterString)) {
					flag = true;
				}
			});
			if (flag) {
				tempArray.push(item);
			}
		});
		filteredData = tempArray;

		return filteredData;
	}

	public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
		if (config.filtering) {
			Object.assign(this.config.filtering, config.filtering);
		}

		if (config.sorting) {
			Object.assign(this.config.sorting, config.sorting);
		}

		let filteredData = this.changeFilter(this.data, this.config);
		let sortedData = this.changeSort(filteredData, this.config);
		this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
		this.length = sortedData.length;
	}


}
