import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  @ViewChild('preview') preview;
  codedFile: any;

  constructor() {
  }

  ngOnInit() {
  }

  addProduct() {
    
  }

  showPreview() {
    this.setCodedFile();
  }

  private setCodedFile() {
    var file = this.fileInput.nativeElement.files[0];
    var reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.codedFile = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1],
      };
    };
  }
}
