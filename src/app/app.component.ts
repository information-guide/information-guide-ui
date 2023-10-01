import { Component, OnInit } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'interview-guide-ui';

  constructor(private hljsLoader: HighlightLoader) {}

  ngOnInit(): void {
    // const themeAndroidStudio: string = '/node_modules/highlight.js/styles/androidstudio.css';
    // this.hljsLoader.setTheme(themeAndroidStudio);
  }
}
