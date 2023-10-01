import { Component } from '@angular/core';
import { ActionServiceService } from 'src/app/services/action-service.service';
import { AddContentComponent } from '../add-content.component';

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.scss']
})
export class AddTextComponent {
  public text!: string;
  public unique_key!: number;
  public parentRef!: AddContentComponent;
  public selectedFormat = "text";

  constructor(private actionService: ActionServiceService) { }

  deleteText() {
    this.actionService.deleteContentItem.next(this.unique_key);
  }

  handleKeydown(event: any) {
    if (event.key == 'Tab') {
      event.preventDefault();
      var start = event.target.selectionStart;
      var end = event.target.selectionEnd;
      event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
  }

  formatChange(event: any) {
    this.selectedFormat = event.value;
  }
}
