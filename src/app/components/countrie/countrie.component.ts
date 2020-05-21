import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Services
import { AllCountriesService } from 'src/app/services/all-countries.service';
// Models
import { CountriInfo } from 'src/app/models/countrieInfo';
import { timeline } from 'src/app/models/timelineInfected';
import { latest_data } from 'src/app/models/CountriesLatest_dataInfected';
// Charts
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
	selector: 'app-countrie',
	templateUrl: './countrie.component.html',
	styleUrls: [ './countrie.component.css' ],
})
export class CountrieComponent implements OnInit {
	constructor(private countryAll: AllCountriesService, private ruta: ActivatedRoute) {}

	/* 
	*	Variable group 
	*/
	// Save information on infections in the country
	country;
	// Save object with country information
	infoCountrie: CountriInfo = new CountriInfo();
	// Save the url parameter which is the country code
	code = this.ruta.snapshot.params.code;
	// Save an object with contagion information updated every day
	timeLine: timeline = new timeline();
	// Save an object with total contagion information
	latest_data: latest_data = new latest_data();

	// Declaring empty arrays for graphs
	active = [];
	date = [];
	deaths = [];
	recovered = [];
	case = [];

	ngOnInit(): void {
		// Method for infected country
		this.infections();
		// Country information method
		this.countryInformation();
	}

	//Country information method
	infections() {
		// Method with parameter that is located in service and that carries the variable that was passed through the url
		this.countryAll.captureContagiousCountry('/countries/' + this.code).subscribe(res => {
			/*
			*	Each data is stored in variables 
			*/
			// Save information on infections in the country
			this.country = res.data;
			// Save an object with contagion information updated every day
			this.timeLine = res.data.timeline[0];
			console.log(this.timeLine);
			// Save an object with total contagion information
			this.latest_data = res.data.latest_data;

			// Data is added to variables for the pie chart
			this.case.push(res.data.timeline[0].active);
			this.case.push(res.data.timeline[0].recovered);
			this.case.push(res.data.timeline[0].deaths);
			// For to add the elements to the variables to show them in the line graph
			for (var i in res.data.timeline) {
				this.active.push(res.data.timeline[i].active);
				this.date.push(res.data.timeline[i].date);
				this.deaths.push(res.data.timeline[i].deaths);
				this.recovered.push(res.data.timeline[i].recovered);
			}
			// Order the data to display it on the line graph
			this.active.reverse();
			this.deaths.reverse();
			this.recovered.reverse();
			this.date.reverse();
			// Cut off part of the date shown on the line graph
			for (let i = 0; i < this.date.length; i++) {
				const put = this.date[i].split('-');
				this.date[i] = `${put[1]}-${put[2]}`;
			}
		});
	}

	// Method for infected country
	countryInformation() {
		// Method with parameter that is located in service and that carries the variable that was passed through the url
		this.countryAll.captureCountry(this.code).subscribe(res => {
			// Save object with country information
			this.infoCountrie = res;
		});
	}
	/* 
	*	LINE CHART
	*/
	lineChartLegend = true;
	lineChartType = 'line';
	lineChartOptions = {
		responsive: true,
	};
	lineChartData: ChartDataSets[] = [
		{ data: this.active, label: 'Cases Activos' },
		{ data: this.deaths, label: 'Cases Deaths' },
		{ data: this.recovered, label: 'Cases Recovered' },
	];
	lineChartLabels: Label[] = this.date;
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

	/* 
	*	PIE CHART
	*/
	pieChartLegend = true;
	pieChartType: ChartType = 'pie';
	pieChartOptions = {
		responsive: true,
	};
	pieChartLabels: Label[] = [ 'Active', 'Recovered', 'Deaths' ];
	pieChartData: SingleDataSet = this.case;
	pieChartColors: Color[] = [
		{
			borderColor: [ 'rgb(140, 154, 165)', 'rgb(51, 195, 83)', 'rgb(220, 52, 68)' ],
			backgroundColor: [ 'rgb(140, 154, 165)', 'rgb(51, 195, 83)', 'rgb(220, 52, 68)' ],
		},
	];
}
