import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserAllComponent } from './user-all/user-all.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: UserIndexComponent,
    children: [ 
      //{path:'usuarios',component:UserAllComponent},
      { path:'registrar', component:UserCreateComponent},
      {path:'login',component:UserLoginComponent},
      
    ],
    
  },
  { path: 'usuarios', component: UserAllComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
