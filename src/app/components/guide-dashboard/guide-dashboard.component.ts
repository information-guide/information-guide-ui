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
  topic: string = '';
  informations: any[] = [];
  message: string = '';

  constructor(private informationService: InformationServiceService, 
    private actionService: ActionServiceService,
    private editService: EditServiceService,
    private router: Router) {}

  ngOnInit(): void {
    this.message = 'Please select a topic!';
    this.actionService.topicChangeEvent.subscribe(topicId => {
      this.loadInformation(topicId);
    });
  }

  loadInformation(topic: number) {
    this.reset();

    this.informationService.getAllTopicInformation(topic).subscribe(response => {
      if(response && response.informations.length) {
        this.topic = response.topicName;
        this.informations = response.informations.map((r: any) => {
          r.answer = JSON.parse(r.answer);
          return r;
        });
      } else {
        this.message = "No content to display!"
      }
    });
  }

  reset() {
    this.topic = '';
    this.informations = [];
    this.message = '';
  }

  deleteInformation(id: number, index: number) {
    this.informationService.deleteInformationById(id).subscribe(() => {
      alert('deleted');
      this.informations.splice(index, 1);
    });
  }

  search() {
    console.log('enter');
  }

  editInformation(information: any) {
    this.editService.question = information.question;
    this.editService.answer = information.answer;
    this.editService.informationId = information.id;
    this.editService.selectedTopicId = information.topicId;
    this.router.navigate(["/dashboard/add-information"], { queryParams: { edit: true }});
  }
}
