import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employees } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-edit-employee',
	templateUrl: './edit-employee.component.html',
	styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
	@Input() employee?: Employees;
	@Output() employeesUpdate = new EventEmitter<Employees[]>();

	constructor(private employeesService: EmployeeService) {}

	ngOnInit(): void {}

	updateEmployee(employee: Employees) {
		this.employeesService
			.updateEmployee(employee)
			.subscribe((employees: Employees[]) =>
				this.employeesUpdate.emit(employees)
			);
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: '¡Empleado actualizado exitosamente!',
			showConfirmButton: false,
			timer: 3500,
		});
	}

	deleteEmployee(employee: Employees) {
		Swal.fire({
			title: '¿Deseas eliminar este empleado?',
			text: 'Esta acción no se puede deshacer',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, eliminar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				this.employeesService.deleteEmployee(employee).subscribe({
					next: (employees: Employees[]) => {
						this.employeesUpdate.emit(employees);
						Swal.fire({
							text: '¡Empleado eliminado exitosamente!',
							icon: 'success',
						});
					},
					error: (error) => {
						// En caso de error en la eliminación, mostrar un mensaje de error
						Swal.fire({
							text: 'Error al eliminar el empleado. Por favor, inténtalo de nuevo.',
							icon: 'error',
						});
					},
				});
			}
		});
	}

	createEmployee(employee: Employees) {
		this.employeesService
			.createEmployee(employee)
			.subscribe((employees: Employees[]) =>
				this.employeesUpdate.emit(employees)
			);

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: '¡Nuevo empleado creado exitosamente!',
			showConfirmButton: false,
			timer: 3500,
		});
	}
}
