import { Component } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import { ActionServiceService } from 'src/app/services/action-service.service';
import { AddContentComponent } from '../add-content.component';

@Component({
  selector: 'app-add-code',
  templateUrl: './add-code.component.html',
  styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent {

  public unique_key!: number;
  public parentRef!: AddContentComponent;

  constructor(private actionService: ActionServiceService) {}

  codeModel: CodeModel = {
    language: 'typescript',
    uri: 'main.ts',
    value: '',
    dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor']
  };

  options = {
    minimap: {
      enabled: true,
    },
    
  };

  deleteCode() {
    this.actionService.deleteContentItem.next(this.unique_key);
  }
}
