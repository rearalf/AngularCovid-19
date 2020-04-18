import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CountrieComponent } from './components/countrie/countrie.component';

const routes: Routes = [
	{
		path: '',
		component: InicioComponent,
		pathMatch: 'full',
	},
	{
		path: 'coutrie/:code',
		component: CountrieComponent,
	},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {}
