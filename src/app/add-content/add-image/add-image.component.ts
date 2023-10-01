import { Component } from '@angular/core';
import { ActionServiceService } from 'src/app/services/action-service.service';
import { AddContentComponent } from '../add-content.component';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent {
  fileToUpload: File | null = null;
  imageSrc: any = [];

  public unique_key!: number;
  public parentRef!: AddContentComponent;

  constructor(private actionService: ActionServiceService) { }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.fileToUpload = (target.files as FileList).item(0);

    Array.from(target.files as FileList).forEach(file => {
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc.push(e.target.result); console.log(this.imageSrc);
      };
      reader.readAsDataURL(file);
    });
  }

  // uploadFileToActivity() {
  //   this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
  //     // do something, if upload success
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  // postFile(fileToUpload: File): Observable<boolean> {
  //   const endpoint = 'your-destination-url';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: yourHeadersConfig })
  //     .map(() => { return true; })
  //     .catch((e) => this.handleError(e));
  // }

  deleteImages() {
    this.actionService.deleteContentItem.next(this.unique_key);
  }

  deleteImage(index: number) {
    this.imageSrc.splice(index, 1);
  }

}
