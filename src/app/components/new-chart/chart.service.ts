import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class ChartService {
  constructor(private http: HttpClient) {}

  public liveTrama(): Observable<any> {
    let switchJson = 0;
    const nowStr = moment(new Date()).format('D-MMM-YY');
    return interval(2000).pipe(
      switchMap(() => {
        const fileName = `./assets/tramas/trama_${switchJson}.json`;
        // console.log(fileName, 'file ro print');

        switchJson++;
        if (switchJson > 5) {
          switchJson = 0;
        }
        // const mergeById = ([t, s], index) => t.map(p => Object.assign({}, p, s[index]));

        return this.http.get(fileName).pipe(
          map((res: { t: string[]; Flujo: number[] }) => {
            return res.t.map((tiempo: string, index: number) => {
              return {
                date: moment(`${nowStr} ${tiempo}`, 'D-MMM-YY HH:mm:ss.SSSSSS').toDate().getTime(),
                // date: `${nowStr} ${tiempo}`,
                close: (res.Flujo[index] + Math.random()),
              };
            });
          })
        );
      })
    );
  }

  tramasBySteps(step: number): Observable<any> {
    const fileName = `./assets/tramas/trama_${step}.json`;
    const nowStr = moment(new Date()).format('D-MMM-YY');
    return this.http.get(fileName).pipe(
      map((res: { t: string[]; Flujo: number[] }) => {
        return res.t.map((tiempo: string, index: number) => {
          return {
            // date: moment(`${nowStr} ${tiempo}`, 'D-MMM-YY HH:mm:ss.SSSSSS').toDate().getTime(),
            date: `${nowStr} ${tiempo}`,
            close: res.Flujo[index],
          };
        });
      })
    );
  }

  public updateTrama(): Observable<any> {
    return this.http.get('./assets/tramas/trama_0.json').pipe(
      map((res: any) => {
        return {
          fechas: res.t,
          flujo: res.Flujo,
        };
      })
    );
  }
}
