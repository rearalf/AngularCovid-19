import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountriInfo } from '../models/countrieInfo';

@Injectable({
	providedIn: 'root',
})
export class AllCountriesService {
	constructor(private http: HttpClient) {}

	// Variable with api routes
	 infection: string = 'https://corona-api.com';
	 countryInformation: string = 'https://restcountries.eu/rest/v2/alpha/'

	// Function that gives the infections of the covid-19
	captureContagiousCountry(enlace) {
		return this.http.get<any>(this.infection + enlace);
	}

	// Function that gives country information
	captureCountry(code) {
		return this.http.get<CountriInfo>(this.countryInformation + code);
	}
}
