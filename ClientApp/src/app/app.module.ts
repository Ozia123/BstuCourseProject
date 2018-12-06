import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatTreeModule,
    MatStepperModule,
    MatDialogModule,
    MatSelectModule
} from '@angular/material';

import { SpeechModule } from 'ngx-speech';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { TheoryPageComponent } from './components/theory-page/theory-page.component';
import { ContentsComponent } from './components/contents/contents.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { SetupComponent } from './components/setup/setup.component';
import { SpeechComponent } from './components/speech/speech.component';
import { SpeechDialogs } from './components/speech/dialogs';

import { TranslatePipe } from './pipes/translate.pipe';

import { TranslationService } from './services/translation.service';
import { ContentsService } from './services/contents.service';
import { SpeechService } from './services/speech.service';
import { ApiService } from './services/api.service';

import { getCurrentLanguageCode } from './components/speech/speech-helper/speech-helper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavMenuComponent,
        TheoryPageComponent,
        ContentsComponent,
        SetupComponent,
        TitlePageComponent,
        SpeechComponent,
        SpeechDialogs.SearchComponent,
        SpeechDialogs.WeatherComponent,
        TranslatePipe,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatGridListModule,
        MatMenuModule,
        MatCardModule,
        MatTreeModule,
        MatStepperModule,
        MatDialogModule,
        MatSelectModule,
        SpeechModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'page/:page', component: TheoryPageComponent },
            { path: 'title-page', component: TitlePageComponent },
            { path: 'contents', component: ContentsComponent },
            { path: '**', redirectTo: '' }
        ])
    ],
    entryComponents: [
        SpeechDialogs.SearchComponent,
        SpeechDialogs.WeatherComponent,
    ],
    exports: [
        MatButtonModule
    ],
    providers: [
        TranslatePipe,
        TranslationService,
        ContentsService,
        SpeechService,
        ApiService,
        { provide: 'SPEECH_LANG', useValue: getCurrentLanguageCode() }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
