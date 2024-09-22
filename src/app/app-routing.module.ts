import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Containers

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    data: {
      title: 'Login',
    },
    children: [
      {
        path: 'login',
        data: {
          title: 'Login',
          layout: { customLayout: false, layoutNavigationTop: true },
        },
        loadChildren: () =>
          import(
            './Modules/06Security/00Auth/authentication.module'
          ).then((m) => m.AuthenticationModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
