import { ArrayType, LiteralArray } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {
  id = this.activatedRoute.snapshot.params['id']
  recipe: Recipe | undefined

  constructor(
    private formBuilder: FormBuilder, 
    private api: ApiService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private change: ChangeDetectorRef,
    private userService: UserService
    ) { 
        this.api.getSingleRecipe(this.id).subscribe((recipe) => {
        
        if (recipe.owner?._id !== this.userService.user?._id) {
          this.router.navigate(['/recipe-list'])
        }
        this.recipe = recipe
        recipe.ingredients.forEach(ingredient => {
          this.addField()
        });
        this.change.detectChanges()
      })
    }

  myForm = this.formBuilder.group({
    recipeName : ['',[Validators.required, Validators.minLength(3)]],
    descriptionText : ['',[Validators.required, Validators.minLength(10)]],
    linkText : ['',[Validators.required, Validators.minLength(10)]],
    preperationTime : ['',[Validators.required]],
    // TODO add custom picture link validator
    ingredientFields: this.formBuilder.array([
      // this.formBuilder.control(
      // '',[Validators.required, Validators.minLength(3)])
    ])
  }) 
  

  get ingredientFields(){
    return this.myForm.get('ingredientFields') as FormArray;
  }

  addField() {    
    this.ingredientFields.push(
      this.formBuilder.control(
        '',[Validators.required, Validators.minLength(3)]));
    this.change.detectChanges()
  }

  deleteItem(index:number) {
    this.recipe?.ingredients.splice(index,1)
    this.ingredientFields.removeAt(index)
    this.change.detectChanges()
  }

  getInput(i:number) {
    return (<FormArray>this.myForm.get('ingredientFields')).controls[i];
  }
  
  editRecipe() {    
    if (this.myForm.invalid) {
      throw Error('Please fill all fields!');
    }

    const name = this.myForm.value.recipeName
    const description = this.myForm.value.descriptionText
    const image = this.myForm.value.linkText
    const ingredients = this.myForm.value.ingredientFields as string[]
    const preperationTime = Number(this.myForm.value.preperationTime)
    
    

    this.api.editRecipe(name!, description!, image!, ingredients!, preperationTime!, this.id!).subscribe(()=> {
      this.router.navigate([`/recipe/${this.id}`])})
  }
}
