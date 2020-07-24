import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TestSubjectComponent } from './components/test-subject/test-subject.component';
import { TestTwoSubjectComponent } from './components/test-two-subject/test-two-subject.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'test1', pathMatch: 'full' },
  { path: 'test1', component: TestSubjectComponent },
  { path: 'test2', component: TestTwoSubjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
