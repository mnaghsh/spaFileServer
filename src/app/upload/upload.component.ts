import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  myMscSend = false
  mailSend = false
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    debugger
    const formData = new FormData();
    fileToUpload['userId']=981105
    fileToUpload['myMscSend']=this.myMscSend
    fileToUpload['mailSend']=this.mailSend
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('file', fileToUpload, fileToUpload['userId']);
    formData.append('file', fileToUpload, fileToUpload['myMscSend']);
    formData.append('file', fileToUpload, fileToUpload['mailSend']);
    //formData.append('userId',"981105");
    

    this.http.post('https://localhost:5001/api/upload/?981105', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }


  returnToCreate = () => {
    this.isCreate = true;
    this.name = '';
    this.address = '';
  }
  uploadFinished = (event) => { 
    this.response = event; 
  }
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:5001/${serverPath}`; 
  }
  isCreate: boolean;
  name: string;
  address: string;
  response: any;

}