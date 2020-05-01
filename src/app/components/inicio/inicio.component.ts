import { Component, OnInit } from '@angular/core';
import { AllCountriesService } from 'src/app/services/all-countries.service';
import { Router } from '@angular/router';
import { timeline } from 'src/app/models/timelineInfected';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: [ './inicio.component.css' ],
})
export class InicioComponent implements OnInit {
	constructor(private allCountries: AllCountriesService, private router: Router) {}

	/* Declarando variables para guardar los datos datos */
	// Contiene todos los datos de contagiados por país.
	countries = new Array();
	// Contiene todos los datos de contagiados por país.
	noTouchCountries = new Array();
	// Contiene la información de contagios a nivel mundial
	information: timeline = new timeline();

	ngOnInit(): void {
		// Se ejecuta la método para los datos de contagios a nivel mundial
		this.contagioGeneral();
		// Se ejecuta la método para los datos de contagios por país
		this.contagioPorPais();
	}

	// Método para datos de contagio a nivel mundial
	contagioGeneral() {
		// Función con parametro ubicada en el servicio y que trae un arreglo
		this.allCountries.capturarPaisContagiado('/timeline').subscribe(res => {
			this.information = res.data[0];
		});
	}

	// Método para los datos de contagios por país
	contagioPorPais() {
		// Funcion con parametro ubicado en el sevicio que trae un erreglo de paises contagiados
		this.allCountries.capturarPaisContagiado('/countries').subscribe(res => {
			res.data.forEach(element => {
				// Guarda los datos en las dos variables de arreglos.
				this.countries.push(element);
				// Esta varialble nos ayuda en el buscador.
				this.noTouchCountries.push(element);
			});

			// Esta operación ayuda a ordenar los objetos del arreglo por medio de uno de sus campos
			this.countries.sort((a, b) => a.latest_data.confirmed - b.latest_data.confirmed);
			this.noTouchCountries.sort((a, b) => a.latest_data.confirmed - b.latest_data.confirmed);

			/* for (let i = 0; i < this.countries.length; i++) {
				
					Con ayuda del for se recorre todo el arreglo para que se el pase como parametros 
					un campo de los objetos y se retorne para luego se agrege un campo nuevo en el arreglo 
					con el dato.
				
				this.allCountries.capturarPais(this.countries[i].code).subscribe(res => {
					 
						La información que retorna es un objeto y un campo de ese objeto es incluido en el 
						objeto que va pasando en el for 
					
					this.countries[i].flag = res.flag;
					this.noTouchCountries[i].flag = res.flag;
				});
			} */
		});
	}

	// Método para buscar país
	buscarPais(event) {
		if (event != '') {
			/* 
				Se a la segunda variable noTouchCountries se le hace el filtro y
				se guarda en la variable coutries quitando todos los demas valores 
				que tenia el arreglo.
			*/
			this.countries = this.noTouchCountries.filter(x => {
				return x.name.toLocaleLowerCase().includes(event.toLocaleLowerCase());
			});
		}
		else {
			/* 
				Se iguala la variable noTouchCountries con countries por que noTouchCountries 
				contiene el arreglo completo de paises contagiados mientras que countries se 
				cambio el valor cuando entro en el if.
			*/
			this.countries = this.noTouchCountries;
		}
	}
}
