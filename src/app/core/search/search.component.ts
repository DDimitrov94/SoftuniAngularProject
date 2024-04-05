import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  form = this.formBuilder.group({
    search:[""]
  })
  search() {
    const searchInput = this.form.value.search;
    if(this.form.value.search !== undefined){
      this.router.navigate(['/search'], { queryParams: { recipe: searchInput } });
    };
  }
}
