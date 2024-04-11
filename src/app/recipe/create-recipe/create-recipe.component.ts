import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { imgValidator } from 'src/app/shared/validators/img-validator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-recipe',
  templateUrl: 'create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent{  
  constructor(
    private formBuilder : FormBuilder, 
    private apiService: ApiService, 
    private router:Router, 
    private userService: UserService,
    private toastr: ToastrService){}

  myForm = this.formBuilder.group({
    recipeName : ['',[Validators.required, Validators.minLength(3)]],
    descriptionText : ['',[Validators.required, Validators.minLength(10)]],
    linkText : ['',[Validators.required, Validators.minLength(10), imgValidator()]],
    preperationTime : ['',[Validators.required]],
    ingredientFields: this.formBuilder.array([
      this.formBuilder.control(
      '',[Validators.required, Validators.minLength(3)])])
  }) 
  
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get ingredientFields(){
    return this.myForm.get('ingredientFields') as FormArray;
  }

  addField() {    
    this.ingredientFields.push(
      this.formBuilder.control(
        '',[Validators.required, Validators.minLength(3)]));
  }

  deleteItem(index:number) {
    this.ingredientFields.removeAt(index)
  }

  getInput(i:number) {
    return (<FormArray>this.myForm.get('ingredientFields')).controls[i];
  }
  
  createRecipe() {    
    if (this.myForm.invalid) {
      throw Error('Please fill all fields!');
    }

    const name = this.myForm.value.recipeName
    const description = this.myForm.value.descriptionText
    const image = this.myForm.value.linkText
    const ingredients = this.myForm.value.ingredientFields as string[]
    const preperationTime = Number(this.myForm.value.preperationTime)
    
    

    this.apiService.createRecipe(name!, description!, image!, ingredients!, preperationTime!).subscribe(()=> {
      this.toastr.info('Recipe created!', name! ,{positionClass:'toast-bottom-center', timeOut: 3000,} );
      this.router.navigate(['/recipe/recipe-list'])})
  }
}
