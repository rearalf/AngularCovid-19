import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountriInfo } from '../models/countrieInfo';

@Injectable({
	providedIn: 'root',
})
export class AllCountriesService {
	constructor(private http: HttpClient) {}

	ruta: string = 'https://corona-api.com';

	capturarPaisContagiado(enlace) {
		return this.http.get<any>(this.ruta + enlace);
	}

	capturarPais(code) {
		return this.http.get<CountriInfo>('https://restcountries.eu/rest/v2/alpha/' + code);
	}
}
