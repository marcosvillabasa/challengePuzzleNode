import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import {Category} from './Category'
import { User } from "./User";

@Entity({name: "api_recipe"})
export class Recipe{
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number;

    @Column({name: "recipe_name"})
    name: string

    @Column({name: "recipe_description"}) 
    description: string

    @Column({name: "recipe_ingredients"})
    ingredients: string

    @ManyToOne(()=>Category, category=> category.recipes)
    @JoinColumn({name: "category_fk"})
    category: Category

    @ManyToOne(()=>User, user=> user.recipes)
    @JoinColumn({name: "user_fk"})
    user: User

}