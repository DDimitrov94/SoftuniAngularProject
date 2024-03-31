import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DebugTracingFeature } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent{
  constructor(private formBuilder : FormBuilder){}

  myForm = this.formBuilder.group({
    recipeName : ['',[Validators.required, Validators.minLength(1)]],
    descriptionText : ['',[Validators.required, Validators.minLength(10)]],
    linkText : ['',[Validators.required, Validators.minLength(10)]],
    ingrediantFields: this.formBuilder.array([])
  }) 
  

  get ingrediantFields(){
    return this.myForm.get('ingrediantFields') as FormArray;
  }
  
  addField() {    
    this.ingrediantFields.push(
      this.formBuilder.group({
        ingrediant: ['']
    }));
  }

  deleteItem(index:number) {
    this.ingrediantFields.removeAt(index)
  }

  createRecipe () {
    console.log(this.myForm.value);
  }


  // constructor(private fb:FormBuilder) {}

  // form = this.fb.group({
  //   text: [''],
  //   money: [''],
  //   items:this.fb.array([])
  // })
  

  // get items(){
  //   return this.form.get('items') as FormArray
  // }


  // deleteItem(index:number) {
  //   this.items.removeAt(index)
  // }

  // addItem() {
  //   this.items.push(this.fb.group({
  //     name: [''],
  //     age: ['']
  //   }))
  // }

  // submit() {
  //   console.log(this.form.value);
  // }
}
