import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

import { UserService } from './user.service';
import { PostService } from './post.service';
import { ProfileService } from './profile.service';

import { AppComponent } from './app.component';
import { BerandaComponent } from './beranda/beranda.component';
import { ProfileeditComponent } from './profileedit/profileedit.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const appRoutes: Routes = [
    { path: 'home', component: BerandaComponent },
    { path: 'user/:username', component: UserComponent },
    { path: 'user/:username/post/:id', component: PostComponent },
    { path: 'profile/edit', component: ProfileeditComponent },
    { path: 'aboutus', component: AboutusComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        BerandaComponent,
        UserComponent,
        ProfileeditComponent,
        PostComponent,
        AboutusComponent,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        IonicStorageModule.forRoot(),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        UserService,
        PostService,
        ProfileService,
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }
