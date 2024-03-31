import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent{
  constructor(private formBuilder : FormBuilder, private apiService: ApiService){}

  myForm = this.formBuilder.group({
    recipeName : ['',[Validators.required, Validators.minLength(3)]],
    descriptionText : ['',[Validators.required, Validators.minLength(10)]],
    linkText : ['',[Validators.required, Validators.minLength(10)]],
    // TODO add custom picture link validator
    ingredientFields: this.formBuilder.array([
      this.formBuilder.control(
      '',[Validators.required, Validators.minLength(3)])])
  }) 
  

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
    console.log(this.myForm.value);
    
    if (this.myForm.invalid) {
      throw Error('Please fill all fields!');
    }

    const name = this.myForm.value.recipeName
    const description = this.myForm.value.descriptionText
    const image = this.myForm.value.linkText
    const ingredients = this.myForm.value.ingredientFields
    

    this.apiService.createRecipe({name,description,image,ingredients})
  }
}
