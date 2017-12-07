import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: string;

  @ViewChild('fileInput') fileInput;
  @ViewChild('preview') preview;
  codedFile: any;

  product: FormGroup;
  categories: string[];

  sendProduct: any;
  succesMessage: string;

  constructor(private authService: AuthenticationService, private router: Router, private fb: FormBuilder, private productService: ProductService) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(data => { this.user = data; console.log(data); });    

    this.productService.categories.subscribe(item => {
      this.categories = item;
    });

    this.initForm();
  }

  addProduct() {
    this.sendProduct = this.product.value;
    this.sendProduct.image = this.codedFile;

    this.productService.addProduct(this.user, this.sendProduct).subscribe(item => {
      this.succesMessage = "Succesfully added " + this.sendProduct.name;
      this.initForm();
    });
  }

  initForm() {
    this.product = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
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
