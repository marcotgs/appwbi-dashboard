import { Component, ViewChild } from '@angular/core';
import { AngularFileUploaderModule, AngularFileUploaderComponent } from 'angular-file-uploader';

@ViewChild('fileUpload1', {static: true})


@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.scss']
})
export class UploadComponent {

  private fileUpload1: AngularFileUploaderComponent;

  resetUpload1: boolean;
  resetUpload2: boolean;
  resetUpload3: boolean;
  token = 'lkdjlfjld';
  afuConfig1 = {
    multiple: true,
    uploadAPI: {
      url: 'https://slack.com/api/files.upload'
    }
  };

  afuConfig2 = {
    theme: 'attachPin',
    hideProgressBar: 'true',
    hideResetBtn: 'true',
    maxSize: '1',
    uploadAPI: {
      url: 'https://slack.com/api/files.upload',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    formatsAllowed: '.jpg,.png',
    multiple: 'true'
  };
  afuConfig3 = {
    theme: 'dragNDrop',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    maxSize: '1',
    uploadAPI: {
      url: 'https://slack.com/api/files.upload'
    },
    formatsAllowed: '.jpg,.png',
    multiple: true
  };

  DocUpload(env) {
    console.log(env);
  }

  resetfu(id) {
    // this.rfu.resetFileUpload(id);
    // id == 1 ? this.afuref1.resetFileUpload() : this.afuref2.resetFileUpload();
    this[`afuref${id}`].resetFileUpload();
    // this.resetUpload1 = true;
  }

}
