import { Component } from '@angular/core';
import { Employees } from './models/employee';
import { EmployeeService } from './services/employee.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'FRONT';
	employees: Employees[] = [];
	employeeToEdit?: Employees;
	showNewButton: boolean = true;

	constructor(private employeeService: EmployeeService) {}

	ngOnInit(): void {
		this.employeeService
			.getEmployees()
			.subscribe((result: Employees[]) => (this.employees = result));
	}

	updateEmployeeList(employees: Employees[]) {
		this.employees = employees;
		this.showNewButton = true; // Muestra el botón "Nuevo" después de actualizar la lista
	}

	initNewEmployee() {
		this.employeeToEdit = new Employees();
		this.showNewButton = false; // Oculta el botón "Nuevo" al iniciar la edición de un nuevo empleado
	}

	editEmployee(employee: Employees) {
		this.employeeToEdit = employee;
		this.showNewButton = false; // Oculta el botón "Nuevo" al editar un empleado existente
	}
}
