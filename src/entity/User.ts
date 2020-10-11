import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Recipe } from "./Recipe";

@Entity({name: "api_user"})
export class User{
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number;

    @Column({name: "user_name"})
    name: string

    @Column({name: "user_email"}) 
    email: string

    @Column({name: "user_password"})
    password: string

    @OneToMany(()=> Recipe, recipe => recipe.user)
    recipes: Recipe[] 

}