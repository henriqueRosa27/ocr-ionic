import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByapiPage } from './byapi.page';

const routes: Routes = [
  {
    path: '',
    component: ByapiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ByapiPageRoutingModule {}
