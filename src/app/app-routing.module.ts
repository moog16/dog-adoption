import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DogsComponent} from './dogs/dogs.component';
import {DetailsComponent} from './details/details.component';

const routes: Routes = [
  {path: '', component: DogsComponent},
  {path: ':searchText', component: DogsComponent},
  {path: 'details/:name', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
