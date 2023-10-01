import { Component, OnInit } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';
import { ActionServiceService } from './services/action-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showSpinner = false;

  constructor(private actionService: ActionServiceService) { }

  ngOnInit(): void {
    this.actionService.spinnerEvent.subscribe(showSpinner => this.showSpinner = showSpinner);
  }
}
