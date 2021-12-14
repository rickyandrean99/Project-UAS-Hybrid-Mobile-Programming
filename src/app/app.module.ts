import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';

import { UserService } from './user.service';
import { PostService } from './post.service';
import { ProfileService } from './profile.service';

import { AppComponent } from './app.component';
import { BerandaComponent } from './beranda/beranda.component';
import { ProfileeditComponent } from './profileedit/profileedit.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BlockComponent } from './block/block.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { HiddenpostComponent } from './hiddenpost/hiddenpost.component';
import { SavedComponent } from './saved/saved.component';
import { SearchComponent } from './search/search.component';
import { CommentComponent } from './comment/comment.component';
import { EditpostComponent } from './editpost/editpost.component';

const appRoutes: Routes = [
    { path: 'home', component: BerandaComponent },
    { path: 'user/:username', component: UserComponent },
    { path: 'user/:username/post/:id', component: PostComponent },
    { path: 'user/:username/post/:id/comment', component: CommentComponent },
    { path: 'profile/edit', component: ProfileeditComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'blocked', component: BlockComponent },
    { path: 'createpost', component: CreatepostComponent },
    { path: 'editpost/:id', component: EditpostComponent },
    { path: 'hiddenpost', component: HiddenpostComponent },
    { path: 'saved', component: SavedComponent },
    { path: 'search', component: SearchComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        BerandaComponent,
        UserComponent,
        ProfileeditComponent,
        PostComponent,
        AboutusComponent,
        BlockComponent,
        CreatepostComponent,
        EditpostComponent,
        HiddenpostComponent,
        SavedComponent,
        SearchComponent,
        CommentComponent
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
        Camera,
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }
