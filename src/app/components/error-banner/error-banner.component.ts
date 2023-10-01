import { Component, OnInit } from '@angular/core';
import { ActionServiceService } from 'src/app/services/action-service.service';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrls: ['./error-banner.component.scss']
})
export class ErrorBannerComponent implements OnInit{
  errors: string[] = [];

  constructor(private actionService: ActionServiceService) {}

  ngOnInit(): void {
    this.actionService.errors.subscribe((errors: string[]) => {
      this.errors = errors;
    });
  }

}
