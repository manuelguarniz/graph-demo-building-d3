import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/paciente.inteface';



@Component({
  selector: 'app-test-subject',
  templateUrl: './test-subject.component.html',
  styleUrls: ['./test-subject.component.scss']
})
export class TestSubjectComponent implements OnInit {
  name: string;
  paciente: Paciente;

  constructor(
    private appService: AppService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.paciente = {
      id: 1,
      nombre: 'aun no tengo nombre',
    };
  }

  changeModel(value: string) {
    // console.log(value, 'value');
    // console.log(this.name, 'name');
  }

  enviarDatos() {
    this.router.navigate(['test2']);
    this.paciente.nombre = this.name;
    this.appService.setName(this.paciente);
  }
}
