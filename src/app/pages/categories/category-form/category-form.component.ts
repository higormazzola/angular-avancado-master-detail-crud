import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import toastr from "toastr";

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

  submitForm() {
    this.submitingForm = true;

    if(!this.id) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      "id": [null],
      "name": [null, [Validators.required, Validators.minLength(2)]],
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

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category).subscribe(category => {
      this.actionForSuccess(category);
    }, error => {
      this.actionForError(error);
    });
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.update(category).subscribe(category => {
      this.actionForSuccess(category);
    }, error => {
      this.actionForError(error);
    });
  }

  private actionForSuccess(category: Category) {
    toastr.success("Solicitação processada com sucesso!");
    this.router.navigateByUrl("categories", {skipLocationChange: true}).then(
      () => this.router.navigate(["categories/edit", category.id])
    )
  }

  private actionForError(error) {
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");
    this.submitingForm = false;
  }

}
