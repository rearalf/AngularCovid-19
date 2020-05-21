import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Sevices
import { AllCountriesService } from 'src/app/services/all-countries.service';
// Models
import { timeline } from 'src/app/models/timelineInfected';
// Charts
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: [ './inicio.component.css' ],
})
export class InicioComponent implements OnInit {
	constructor(private countryAll: AllCountriesService, private router: Router) {}

	/* 
	*	Variable group 
	*/
	// Save list of countries with contagions
	countries = new Array();
	// Save list of countries with contagions searched for
	noTouchCountries = new Array();
	// Save the information of infections worldwide
	information: timeline = new timeline();

	/* 
	*	Variables for the graph
	*/
	allActive = new Array();
	allDeaths = new Array();
	allRecovered = new Array();
	date = new Array();

	ngOnInit(): void {
		// Method for global infection data
		this.contagioGeneral();
		// The method is run for infection data by country
		this.contagioPorPais();
	}

	// Method for global infection data
	contagioGeneral() {
		// Función con parametro ubicada en el servicio y que trae un arreglo
		this.countryAll.captureContagiousCountry('/timeline').subscribe(res => {
			// Save the information of infections worldwide
			this.information = res.data[0];
			// ForEach to save all the data in the graph variables
			res.data.forEach(item => {
				this.date.push(item.date);
				this.allActive.push(item.active);
				this.allDeaths.push(item.deaths);
				this.allRecovered.push(item.recovered);
			});
			// The arrangement is ordered to show it on the graph
			this.allActive.sort((a, b) => a - b);
			this.allDeaths.sort((a, b) => a - b);
			this.allRecovered.sort((a, b) => a - b);
			this.date.reverse();
			// Cut off part of the date shown on the line graph
			for (let i = 0; i < this.date.length; i++) {
				const put = this.date[i].split('-');
				this.date[i] = `${put[1]}-${put[2]}`;
			}
		});
	}

	// The method is run for infection data by country
	contagioPorPais() {
		// Function with parameter located in the service that brings a bug of infected countries
		this.countryAll.captureContagiousCountry('/countries').subscribe(res => {
			res.data.forEach(element => {
				// Save the data in the two array variables.
				this.countries.push(element);
				// This variable helps us in the search engine.
				this.noTouchCountries.push(element);
			});

			// This operation helps to sort the objects of the array by means of one of its fields
			this.countries.sort((a, b) => a.latest_data.confirmed - b.latest_data.confirmed);
			this.noTouchCountries.sort((a, b) => a.latest_data.confirmed - b.latest_data.confirmed);

			/* for (let i = 0; i < this.countries.length; i++) {
				
					Con ayuda del for se recorre todo el arreglo para que se el pase como parametros 
					un campo de los objetos y se retorne para luego se agrege un campo nuevo en el arreglo 
					con el dato.
				
				this.allCountries.captureCountry(this.countries[i].code).subscribe(res => {
					 
						La información que retorna es un objeto y un campo de ese objeto es incluido en el 
						objeto que va pasando en el for 
					
					this.countries[i].flag = res.flag;
					this.noTouchCountries[i].flag = res.flag;
				});
			} */
		});
	}

	// Country search method
	buscarPais(event) {
		// Validate that the variable is not empty
		if (event != '') {
			/* 
			The second variable noTouchCountries is filtered and 
			is saved in the coutries variable, removing all the other 
			values that the array had.
			*/
			this.countries = this.noTouchCountries.filter(x => {
				return x.name.toLocaleLowerCase().includes(event.toLocaleLowerCase());
			});
		}
		else {
			// If the variable is empty
			/* 
				Variable noTouchCountries equals countries because noTouchCountries
				contains the complete array of countries infected while countries are
				I change the value when I enter the if.
			*/
			this.countries = this.noTouchCountries;
		}
	}

	/*
	*	LINE CHART
	*/
	lineChartLegend = true;
	lineChartType = 'line';
	lineChartOptions = {
		responsive: true,
	};
	lineChartLabels: Label[] = this.date;
	lineChartData: ChartDataSets[] = [
		{ data: this.allActive, label: 'Cases Activos' },
		{ data: this.allDeaths, label: 'Cases Deaths' },
		{ data: this.allRecovered, label: 'Cases Recovered' },
	];
	lineChartColors: Color[] = [
		{
			borderColor: 'rgb(92, 103, 113)',
			backgroundColor: 'rgb(92, 103, 113)',
		},
		{
			borderColor: 'rgb(220, 52, 68)',
			backgroundColor: 'rgb(220, 52, 68)',
		},
		{
			borderColor: 'rgb(51, 195, 83)',
			backgroundColor: 'rgb(51, 195, 83)',
		},
	];
}
