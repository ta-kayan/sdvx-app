import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DifficultComponent } from './table/difficult/difficult.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

// 認証
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from './environments';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';


import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { Lv17sComponent } from './table/lv17s/lv17s.component';
import { TopComponent } from './pages/top/top.component';

/* Angular Material*/
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatDividerModule } from '@angular/material/divider'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog';


import { UserEditComponent } from './pages/user-edit/user-edit.component';

import { DataParseService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
    DifficultComponent,
    UserLoginComponent,
    UserInfoComponent,
    Lv17sComponent,
    TopComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // 追加
    AngularFireModule.initializeApp(environment.firebase), // 追加
    AngularFireAuthModule, // 追加
    AngularFirestoreModule, // 追加
    AngularFireStorageModule, //追加
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [    
    AuthService,
    AuthGuard,
    DataParseService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
