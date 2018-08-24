import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuscriptoresComponent }      from './suscriptores/suscriptores.component';
import { AssociatepageComponent }      from './associatepage/associatepage.component';
import { CrecimientoComponent }      from './crecimiento/crecimiento.component';

const routes: Routes = [
  { path: 'suscriptores', component: SuscriptoresComponent },
  { path: 'associate', component: AssociatepageComponent },
  { path: 'crecimiento', component: CrecimientoComponent }
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}



