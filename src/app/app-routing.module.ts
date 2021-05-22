import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DifficultComponent } from './table/difficult/difficult.component';
import { Lv17sComponent } from './table/lv17s/lv17s.component';
import { TopComponent } from './pages/top/top.component';

// 認証
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { AuthGuard } from './guard/auth.guard';


// https://qiita.com/Yamamoto0525/items/e870713d9d05d2d36a80
const routes: Routes = [
  /* add　*/
  //{ path: '', redirectTo: '/dashbord', pathMatch: 'full' },
  { path: 'table/difficult', component: DifficultComponent, canActivate: [AuthGuard]},
  { path: 'table/lv17s', component: Lv17sComponent, canActivate: [AuthGuard]},
  { path: 'userinfo', component: UserInfoComponent, canActivate: [AuthGuard]},
  { path: 'useredit', component: UserEditComponent, canActivate: [AuthGuard]},
  { path: 'login', component: UserLoginComponent},
  { path: '', component: TopComponent },
  { path: 'top', component: TopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
