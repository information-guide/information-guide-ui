import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActionServiceService } from '../services/action-service.service';
import { AddCodeComponent } from './add-code/add-code.component';
import { AddImageComponent } from './add-image/add-image.component';
import { AddTextComponent } from './add-text/add-text.component';
import { InformationServiceService } from '../services/information-service.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { EditServiceService } from '../services/edit-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  informationId: number | null = null;
  question: string = '';
  errors: string[] = [];
  options: any[] = [];
  edit = false;
  addTextComponent = AddTextComponent;
  addCodeComponent = AddCodeComponent;
  addImageComponent = AddImageComponent;
  @ViewChild('autoCompleteInput', { static: false, read: MatAutocompleteTrigger })
  trigger: MatAutocompleteTrigger | any;
  selectedTopic = new FormControl();

  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<any>>();

  @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
  ref: ComponentRef<any> | null = null;

  constructor(private actionService: ActionServiceService,
    private informationService: InformationServiceService,
    private editService: EditServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const isEdit = this.activatedRoute.snapshot.queryParamMap.get('edit');
    this.edit = isEdit === 'true';

    this.actionService.deleteContentItem.subscribe((key: any) => {
      this.removeChild(key);
    });
    this.getTopics();
    if (this.edit) {
      this.initEditInformation();
    }
  }

  getTopics() {
    this.informationService.getAllTopics().subscribe(topics => {
      this.options = topics;

      if (this.edit) {
        this.selectedTopic.setValue(this.options.find(option => option.code = this.editService.selectedTopicId));
      }
    });
  }

  addChild(component: any) {
    this.ref = this.vcr.createComponent(component);
    let childComponent = this.ref.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;

    // add reference for newly created component
    this.componentsReferences.push(this.ref);
  }

  removeChild(key: number) {
    if (this.vcr.length < 1) return;

    let componentRef = this.componentsReferences.filter(
      x => x.instance.unique_key == key
    )[0];

    let vcrIndex: number = this.vcr.indexOf(componentRef.hostView as any);

    // removing component from container
    this.vcr.remove(vcrIndex);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      x => x.instance.unique_key !== key
    );
  }

  addText() {
    this.addChild(this.addTextComponent);
  }

  addCode() {
    this.addChild(this.addCodeComponent);
  }

  addImage() {
    this.addChild(this.addImageComponent);
  }

  save() {
    this.validateData();

    const response = (response: any) => {
      this.router.navigate(['/dashboard/view-guide']);
      this.resetEditInformation();
    };

    const error = (error: any) => {
      console.log(error);
    };

    if (!this.errors.length) {
      const answer = this.componentsReferences.map((c: any) => ({
        type: c.instance.selectedFormat,
        value: c.instance.text
      }));
      if (!this.edit) {
        this.informationService.saveInformation(this.selectedTopic?.value?.code, this.question, JSON.stringify(answer))
          .subscribe({
            next: response.bind(this),
            error: error.bind(this)
          });
      } else {
        this.informationService.updateInformation({
          id: this.informationId,
          topicId: this.selectedTopic?.value?.code,
          question: this.question,
          answer: JSON.stringify(answer)
        }).subscribe({
          next: response.bind(this),
          error: error.bind(this)
        });
      }
    }
  }

  validateData() {
    this.errors = [];
    if (!this.selectedTopic?.value) {
      this.errors.push('Please add topic');
    }
    if (!this.question.trim()) {
      this.errors.push('Please add question');
    }
    this.actionService.errors.next(this.errors);
  }

  ngAfterViewInit() {
    this.trigger.panelClosingActions
      .subscribe((e: any) => {
        if (!e) {
          this.selectedTopic.setValue(null);
        }
      });
    // this.addText();
  }

  onSelect(option: any) {
  }

  getTopicName(option: any) {
    return option?.name;
  }

  initEditInformation() {
    this.question = this.editService.question;
    this.informationId = this.editService.informationId;
    this.editService.answer.forEach((answer: any) => {
      this.addTextEdit(this.addTextComponent, answer.type, answer.value);
    });
  }

  addTextEdit(component: any, selectedFormat: any, text: any) {
    setTimeout(() => {
      this.ref = this.vcr.createComponent(component);
      let childComponent = this.ref.instance;
      childComponent.unique_key = ++this.child_unique_key;
      childComponent.parentRef = self;
      childComponent.text = text;
      childComponent.selectedFormat = selectedFormat;
      this.componentsReferences.push(this.ref);
    }, 500);
  }

  resetEditInformation() {
    this.editService.informationId = null;
    this.editService.question = '';
    this.editService.answer = null;
    this.editService.selectedTopicId = null;
  }
}
