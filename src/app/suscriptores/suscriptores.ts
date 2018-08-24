
export class Suscriptores { 

	getColumns: any;
	getRows: any;
	getArray: any;
	getArrayTest: any;
	pathAsset: string = "./assets/images";
	showImageProfile: any;
	showButtonRemove: any;
	constructor()  {
		this.getColumns = () => {
			return  [{
				name: "profile_pic",
				sort: false
			},{ 
				name: "first_name",
				title: "Nombre",
				sort: 'asc',
				filtering: {filterString: ''}
			}, { 
				name: "last_name",
				title: "Apellido",
				sort: 'asc'
			},{ 
				name: "tasa_de_apertura",
				title: "Tasa de apertura",
				sort: 'asc'
			},{ 
				name: "tasa_de_clicks",
				title: "Tasa de clicks",
				sort: 'asc'
			},{ 
				name: "tags",
				title: "Tags",
				sort: false
			}, {
				name: "remove",
				sort: false
			}]
		};
		this.showImageProfile = (assetPath) => {
			return '<div class="favicon-table" style="background-image:url('+assetPath+')" > </div>';
		};

		this.showButtonRemove = (id) => {
			return '<button type="button"  class="link-remove fa fa-trash btn btn-primary" ></button>';
		}

		this.getRows = (dataArray:any) => {
			let  arrayTestInit = this.getArrayTest();
			let arrayToReturn = [];

			for (let prop in dataArray){
				if (dataArray[prop] != null) {
					arrayToReturn.push({
						profile_pic: this.showImageProfile(dataArray[prop].profile_pic),
						first_name: dataArray[prop].first_name,
						last_name: dataArray[prop].last_name,
						tasa_de_apertura: '',
						tasa_de_clicks: '',
						tags: '',
						remove: this.showButtonRemove(dataArray[prop].psid)

					});
				}
			}

			return arrayToReturn
		}

		this.getArrayTest = () => {
			return [ 
			{
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: '',
				last_name: '',
				tasa_de_apertura: '',
				tasa_de_clicks: 0,
				tags: [],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}
			,{
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Meghan Stephens',
				last_name: 'kenedy',
				tasa_de_apertura: 'Turkey',
				tasa_de_clicks: 8001,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Bertha Herrera',
				last_name: 'kenedy',
				tasa_de_apertura: 'Kenya',
				tasa_de_clicks: 4799,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Karina Key',
				last_name: 'kenedy',
				tasa_de_apertura: 'France',
				tasa_de_clicks: 3907,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Uriel Carson',
				last_name: 'kenedy',
				tasa_de_apertura: 'Venezuela',
				tasa_de_clicks: 5902,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Mira Baird',
				last_name: 'kenedy',
				tasa_de_apertura: 'Niue',
				tasa_de_clicks: 4189,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Ursula Parrish',
				last_name: 'kenedy',
				tasa_de_apertura: 'Macao',
				tasa_de_clicks: 4771,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Josephine Sykes',
				last_name: 'kenedy',
				tasa_de_apertura: 'Holy See (Vatican City State)',
				tasa_de_clicks: 4684,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Maggie Sims',
				last_name: 'kenedy',
				tasa_de_apertura: 'Sudan',
				tasa_de_clicks: 6482,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Rogan Fuentes',
				last_name: 'kenedy',
				tasa_de_apertura: 'Jersey',
				tasa_de_clicks: 4837,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Maya Haney',
				last_name: 'kenedy',
				tasa_de_apertura: 'Falkland Islands',
				tasa_de_clicks: 5752,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Aquila Battle',
				last_name: 'kenedy',
				tasa_de_apertura: 'Azerbaijan',
				tasa_de_clicks: 8470,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}, {
				profile_pic: this.showImageProfile('/assets/images/profile_photo_icon.png'),
				first_name: 'Connor Coleman',
				last_name: 'kenedy',
				tasa_de_apertura: 'Croatia',
				tasa_de_clicks: 6217,
				tags: ["news","sport"],
				remove: '<a class="link-remove fa fa-trash" ><a/>'

			}
			];

		}
	}

}
