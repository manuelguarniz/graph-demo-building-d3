import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-test-two-subject',
  templateUrl: './test-two-subject.component.html',
  styleUrls: ['./test-two-subject.component.scss']
})
export class TestTwoSubjectComponent implements OnInit {
  name = '';

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    this.appService.getName().subscribe(res => {
      if (res) {
        this.name = res.nombre;
        console.log(res);
      }
    });
  }

}
