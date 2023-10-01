import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddContentComponent } from './add-content/add-content.component';
import { MaterialModule } from './material.moduel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTextComponent } from './add-content/add-text/add-text.component';
import { AddCodeComponent } from './add-content/add-code/add-code.component';
import { CodeEditorModule } from '@ngstack/code-editor';
import { AddImageComponent } from './add-content/add-image/add-image.component';
import { ErrorBannerComponent } from './components/error-banner/error-banner.component';
import { ViewGuideComponent } from './view-guide/view-guide.component';
import { AddInformationComponent } from './add-information/add-information.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { GuideDashboardComponent } from './components/guide-dashboard/guide-dashboard.component';
import {
  HighlightModule,
  HighlightOptions,
  HIGHLIGHT_OPTIONS,
} from 'ngx-highlightjs';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AddContentComponent,
    AddTextComponent,
    AddCodeComponent,
    AddImageComponent,
    ErrorBannerComponent,
    ViewGuideComponent,
    AddInformationComponent,
    SideBarComponent,
    GuideDashboardComponent,
    MainDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CodeEditorModule.forRoot(),
    HttpClientModule,
    HighlightModule
  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    useValue: <HighlightOptions>{
      lineNumbers: false,
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      themePath: 'node_modules/highlight.js/styles/github.css',
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml'),
      },
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
