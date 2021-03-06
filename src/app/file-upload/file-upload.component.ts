import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Http, Response } from '@angular/http';
import { uploadURL } from 'upload_url';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  data: any[];
  loading: boolean;
  uploadURL: string = uploadURL;


  constructor(private http: Http) {
    this.loading = true;
  
  }

  ngOnInit() {
  }

  selectedFile: Array<File> = [];
  fileName:any;

  onFileChanged(fileInput: any) {
    this.loading = false;
    this.selectedFile = <Array<File>>fileInput.target.files;
    this.fileName = this.selectedFile[0].name;
    console.log(this.fileName);
  }

  onUpload() {

    const formData: any = new FormData();
    const files: Array<File> = this.selectedFile;
   
    if (!this.validateFile(files[0].name)) {
      alert('Please choose XML file ,selected file format is not supported');
      return false;
    }
    else {
      formData.append("uploads[]", files[0], files[0]['name']);
      this.http.post(this.uploadURL, formData).
        map((res: Response) => res.json()).
        subscribe((success) => {
          this.loading = true;
          console.log("success");
        },
          (error) => console.log("error"));
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'xml') {
      return true;
    }
    else {
      return false;
    }
  }
}