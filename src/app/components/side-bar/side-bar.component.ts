import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { pairwise, startWith } from 'rxjs';
import { ActionServiceService } from 'src/app/services/action-service.service';
import { InformationServiceService } from 'src/app/services/information-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  topics: any[] = [];
  selectedTopic = new FormControl();

  constructor(private informationService: InformationServiceService, private actionService: ActionServiceService) { }

  ngOnInit(): void {
    this.informationService.getAllTopics().subscribe(topics => {
      this.topics = topics.map((t: any) => {
        t.isSelected = false;
        return t;
      });
    });

    this.formControlSubscription();
  }

  formControlSubscription() {
    this.selectedTopic.valueChanges
      .pipe(startWith(null), pairwise())
      .subscribe(([prev, next]: [any, any]) => {
        if (prev) {
          prev.isSelected = false;
        }
        next.isSelected = true;
      });
  }

  selectionChange(option: any) {
    this.selectedTopic.setValue(option);
    this.actionService.topicChangeEvent.next(option.code);
  }


}
