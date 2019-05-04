import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  id: number;
  categoryForm: FormGroup;
  pageTitle: String;
  serverErrorMessages: string[]= null;
  submitingForm: boolean;
  category: Category = new Category();

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
     this.setPageTitle();
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      "id": [null],
      "name": [null, Validators.required, Validators.minLength(2)],
      "description": [null]
    });
  }

  private loadCategory() {
    if(this.id) {
      this.categoryService.getById(this.id).subscribe(category => {
        this.category = category;
        this.categoryForm.patchValue(this.category);
      }, error => alert('Ocorreu um erro no servidor, tente mais tarde!!'));
    }
  }

  private setPageTitle() {
    if(this.id) {
      this.pageTitle = 'Editando Categoria';    
    } else {
      this.pageTitle = 'Cadastro de Nova Categoria';
    }
  }

}
