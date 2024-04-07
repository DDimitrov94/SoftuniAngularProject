import { Recipe } from './recipe';

export interface User {
  recipes: Recipe[];
  favorites: Recipe[];
  _id: string;
  email: string;
  username: string;
  password: string;
}

export interface UserForAuth {
  username: string;
  email: string;
  password: string;
  _id: string;
}
