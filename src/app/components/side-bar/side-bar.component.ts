import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ActionServiceService } from 'src/app/services/action-service.service';
import { InformationServiceService } from 'src/app/services/information-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  topics: any[] = [];

  constructor(private informationService: InformationServiceService, private actionService: ActionServiceService) {}

  ngOnInit(): void {
    this.informationService.getAllTopics().subscribe(topics => {
      this.topics = topics;
    });
  }

  selectionChange(option: any ) {
    this.actionService.topicChangeEvent.next(option.code);
  }
}
