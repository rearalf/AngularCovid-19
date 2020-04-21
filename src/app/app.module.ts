import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { CountrieComponent } from './components/countrie/countrie.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
	declarations: [ AppComponent, InicioComponent, MenuComponent, CountrieComponent ],
	imports: [ BrowserModule, AppRoutingModule, HttpClientModule, ChartsModule ],
	providers: [],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
