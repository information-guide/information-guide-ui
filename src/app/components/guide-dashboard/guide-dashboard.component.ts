import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionServiceService } from 'src/app/services/action-service.service';
import { EditServiceService } from 'src/app/services/edit-service.service';
import { InformationServiceService } from 'src/app/services/information-service.service';

@Component({
  selector: 'app-guide-dashboard',
  templateUrl: './guide-dashboard.component.html',
  styleUrls: ['./guide-dashboard.component.scss']
})
export class GuideDashboardComponent implements OnInit {
  topic: any;
  informations: any[] = [];
  message: string = '';
  infoMsg: string = '';
  searchText: string = '';

  constructor(private informationService: InformationServiceService,
    private actionService: ActionServiceService,
    private editService: EditServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.message = 'Please select a topic!';
    this.actionService.topicChangeEvent.subscribe(topicId => {
      this.actionService.showSpinner(true);
      this.loadInformation(topicId);
    });
  }

  loadInformation(topic: number) {
    this.actionService.showSpinner(true);
    this.informationService.getAllTopicInformation(topic).subscribe(response => {
      this.handleInformationSuccess(response);
    });
  }

  handleInformationSuccess(response: any) {
    this.reset();
    this.actionService.showSpinner(false);
    if (response && response.informations.length) {
      this.topic = response.topic;
      this.informations = response.informations.map((r: any) => {
        r.answer = JSON.parse(r.answer);
        return r;
      });
    } else {
      this.showNoContentMsg(response.topic.name);
    }
  }

  reset() {
    this.informations = [];
    this.message = '';
    this.infoMsg = '';
  }

  deleteInformation(id: number, index: number) {
    this.actionService.showSpinner(true);
    let text = "Do you want to delete?";
    if (confirm(text) == true) {
      this.informationService.deleteInformationById(id).subscribe(() => {
        this.actionService.showSpinner(false);
        this.informations.splice(index, 1);
        if (!this.informations.length) {
          this.showNoContentMsg(this.topic.name);
        }
      });
    } else {
      this.actionService.showSpinner(false);
    }
  }

  showNoContentMsg(topicName: any) {
    this.infoMsg = topicName + ": No content to display!"
    if (this.searchText) {
      this.infoMsg = "Search result not found!"
    }
  }

  search(event: any) {
    const searchText = event.target.value?.trim();
    this.searchText = searchText;
    this.actionService.showSpinner(true);
    if (searchText) {
      this.informationService.searchInformation(this.topic.code, searchText).subscribe(response => {
        this.handleInformationSuccess(response);
      });
    } else {
      this.loadInformation(this.topic.code);
    }
  }

  editInformation(information: any) {
    this.editService.question = information.question;
    this.editService.answer = information.answer;
    this.editService.informationId = information.id;
    this.editService.selectedTopicId = information.topicId;
    this.router.navigate(["/dashboard/add-information"], { queryParams: { edit: true } });
  }
}
