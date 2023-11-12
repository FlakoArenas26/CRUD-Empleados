import { Injectable } from '@angular/core';
import { Employees } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	private url = 'Employee';

	constructor(private http: HttpClient) {}

	public getEmployees(): Observable<Employees[]> {
		return this.http.get<Employees[]>(`${environment.apiUrl}/${this.url}`);
	}

	public updateEmployee(employee: Employees): Observable<Employees[]> {
		return this.http.put<Employees[]>(
			`${environment.apiUrl}/${this.url}`,
			employee
		);
	}

	public createEmployee(employee: Employees): Observable<Employees[]> {
		return this.http.post<Employees[]>(
			`${environment.apiUrl}/${this.url}`,
			employee
		);
	}

	public deleteEmployee(employee: Employees): Observable<Employees[]> {
		return this.http.delete<Employees[]>(
			`${environment.apiUrl}/${this.url}/${employee.id}`
		);
	}
}
