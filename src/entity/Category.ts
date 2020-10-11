import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Recipe } from "./Recipe";

@Entity({name: "api_category"})
export class Category{
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number;

    @Column({name: "category_description"})
    description: string

    @OneToMany(()=> Recipe, recipe => recipe.category)
    recipes: Recipe[]
}