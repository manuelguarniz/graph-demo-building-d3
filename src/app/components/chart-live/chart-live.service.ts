import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { StrucData } from './chart-item.interface';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class ChartLiveService {

  constructor(private http: HttpClient) { }

  public liveTrama(): Observable<StrucData[]> {
    let switchJson = 31;
    return interval(1000).pipe(
      switchMap(() => {
        const fileName = `./assets/tramasJson/trama_${switchJson}.json`;
        // console.log(fileName, 'file ro print');

        switchJson++;
        if (switchJson >= 119) {
          switchJson = 31;
        }

        return this.http.get<any>(fileName).pipe(
          map(res => {
            return res.t.map((value, index) => {
              return {
                x: value,
                y: res.Flujo[index]
              } as StrucData;
            });
          })
        );
      })
    );
  }
}
