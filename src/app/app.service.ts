import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paciente } from './paciente.inteface';

@Injectable()
export class AppService {
  private changeName: BehaviorSubject<Paciente> = new BehaviorSubject(null);
  private nameChange$ = this.changeName.asObservable();

  setName(value: Paciente): void {
    this.changeName.next(value);
  }

  getName(): Observable<Paciente> {
    return this.nameChange$;
  }
}
