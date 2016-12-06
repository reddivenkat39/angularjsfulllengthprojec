import {Component, ElementRef, Input} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

@Component({
  selector   : 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls  : ['./file-upload.component.css']
})
export class FileUploadComponent {

  constructor(private http: Http, private el: ElementRef)
  {

  }

  @Input() multiple: boolean = false;

  upload() {
    let inputEl = this.el.nativeElement.firstElementChild;
    if (inputEl.files.length == 0) return;

    let files :FileList = inputEl.files;
    console.log(files);
    const formData = new FormData();
    formData.append('files', files[0], files[0].name);
    console.log(formData,"form data........");
    formData.append('candidateID','C004');
    console.log(formData,"form data........");
    // for(let i = 0; i < files.length; i++){
    //   formData.append('files[]', files[i],files[i].name);
    // }

    const headersSend = new Headers();
    headersSend.append('enctype','multipart/form-data');
    // headersSend.append('Content-Type','application/json');

    console.log(formData,"form data........");
    this.http
      .post('http://10.10.5.55:8080/uploadfile', formData,{headers: headersSend})
      .subscribe(
        res=>{
          console.log(res);
        }
      );

  }



  //   const headersSend = new Headers({'Content-Type': 'multipart/form-data; boundary=-------------------------acebdf13572468'});
  //   let inputEl = this.el.nativeElement.firstElementChild;
  //   if (inputEl.files.length > 0) { // a file was selected
  //     let files: FileList = inputEl.files[0];
  //     console.log(files);
  //     this.http
  //       .post('http://localhost:8080/uploadfile', files, {headers: headersSend}).subscribe(
  //       res => {
  //         console.log(res['_body']);
  //       }
  //     );
  //     // do whatever you do...
  //     // subscribe to observable to listen for response
  //   }
  // }

}
