import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule',
    canActivate: [AuthGuard] },
  {
    path: 'chat/:id',
    loadChildren: './pages/chat/chat.module#ChatPageModule'
  },
  {
    path: 'inserting/:id',
    loadChildren: './pages/inserting/inserting.module#InsertingPageModule'
  },
  { path: 'create-inserting', loadChildren: './pages/create-inserting/create-inserting.module#CreateInsertingPageModule' ,
    canActivate: [AuthGuard] },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
