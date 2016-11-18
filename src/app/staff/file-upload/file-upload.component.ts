import { Component, ElementRef } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  constructor(private http:Http, private el: ElementRef) { }
  upload() {
    const headersSend = new Headers({'Content-Type': 'multipart/form-data'});
    let inputEl = this.el.nativeElement.firstElementChild;
    if (inputEl.files.length > 0) { // a file was selected
      let files:FileList = inputEl.files[0];
      console.log(files);
      this.http
        .post('http://localhost:8080:8080/uploadfile', files, {headers: headersSend}).subscribe(
        res=>{
          console.log("success");
        }

      );
      // do whatever you do...
      // subscribe to observable to listen for response
    }
  }

}
