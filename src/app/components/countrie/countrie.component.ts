import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllCountriesService } from 'src/app/services/all-countries.service';
import { CountriInfo } from 'src/app/models/countrieInfo';
import { timeline } from 'src/app/models/timelineInfected';
import { latest_data } from 'src/app/models/CountriesLatest_dataInfected';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
	selector: 'app-countrie',
	templateUrl: './countrie.component.html',
	styleUrls: [ './countrie.component.css' ],
})
export class CountrieComponent implements OnInit {
	constructor(private countrieAll: AllCountriesService, private ruta: ActivatedRoute) {}

	// Grupo de variables
	// Guardara objeto de contagios por país
	countrie;
	// Guardara objeto con información del país
	infoCountrie: CountriInfo = new CountriInfo();
	// Guarda el parametro de la url que es el codigo del país
	code = this.ruta.snapshot.params.code;
	// Guarda un objeto con información de contajios actualozados cada día
	timeLine: timeline = new timeline();
	// Guarda un objeto con información de contajios en total
	latest_data: latest_data = new latest_data();

	active = [];
	date = [];
	deaths = [];
	recovered = [];

	ngOnInit(): void {
		// Método con parametro que esta ubicado en servicio y que lleva la variable que se paso por la url
		this.countrieAll.capturarPaisContagiado('/countries/' + this.code).subscribe(res => {
			// Se guardan cada dato
			this.countrie = res.data;
			this.timeLine = res.data.timeline[0];
			this.latest_data = res.data.latest_data;
			for (var i in res.data.timeline) {
				this.active.push(res.data.timeline[i].active);
				this.date.push(res.data.timeline[i].date);
				this.deaths.push(res.data.timeline[i].deaths);
				this.recovered.push(res.data.timeline[i].recovered);
			}
			this.active.sort((a, b) => a - b);
			this.deaths.sort((a, b) => a - b);
			this.recovered.sort((a, b) => a - b);
			this.date.reverse();
		});
		// Método con parametro que esta ubicado en servicio y que lleva la variable que se paso por la url
		this.countrieAll.capturarPais(this.code).subscribe(res => {
			// Se guardan cada dato
			this.infoCountrie = res;
		});
	}

	lineChartData: ChartDataSets[] = [
		{ data: this.active, label: 'Cases Activos' },
		{ data: this.deaths, label: 'Cases Deaths' },
		{ data: this.recovered, label: 'Cases Recovered' },
	];

	lineChartLabels: Label[] = this.date.reverse();

	lineChartOptions = {
		responsive: true,
	};

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

	lineChartLegend = true;
	lineChartPlugins = [];
	lineChartType = 'line';
}
