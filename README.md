# Softuni Angular Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Used technology 
#### Frontend
* Angular 
* ngx-toastr
* Angular Animations ( used by toastr )
* RxJS library

#### Backend
* Express.js
* MongoDB
* MongoDB mongoose

## Site structure 
#### Public part
Guest users can access Login, Register, Home page, Recipes page, Recipe details and Search for recipes.
#### Private part
Logged in users can access all of public part functionalities, additionally they can create, edit and delete their recipes. They can see a list of their own and liked recipes in their profile. 
#### Guards
The app has guards for guest users ( they cannot access edit and profile page ) and for logged in users ( they cannot access login and register page )
