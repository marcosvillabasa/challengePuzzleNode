import {getRepository} from 'typeorm'
import {User} from '../entity/User'
import {Category} from '../entity/Category'
import {Recipe} from '../entity/Recipe'
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')


const createToken = (user: User, secret: String, expiresIn:String) => {
    const {id,name,email} = user
    return jwt.sign({id,name,email},secret, {expiresIn})
}

const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                const users = await getRepository(User).find()
                return users 
            } catch (error) {
                console.log(error)
            }
        },
        login: async (_:any, {token}:any) => {
            const userId = await jwt.verify(token,"SECRET")
            return userId
        },
        getCategories: async () => {
            try {
                const categories = await getRepository(Category).find()
                return categories 
            } catch (error) {
                console.log(error)
            }
        },
        getOneCategory: async (_:any, {id}:any) => {
            try {
                const categoryRepository  = getRepository(Category)
                const category = await categoryRepository.findOne({id})
                if(!category){
                    throw new Error ('Category does not exists')
                }
                return category
            } catch (error) {
                console.log(error)
            }
        },
        getRecipes: async () => {
            try {
                const recipes = await getRepository(Recipe).find()
                return recipes 
            } catch (error) {
                console.log(error)
            }
        },
        getOneRecipe: async (_:any, {id}:any) => {
            try {
                const recipeRepository  = getRepository(Recipe)
                const recipe = await recipeRepository.findOne({id})
                if(!recipe){
                    throw new Error ('Category does not exists')
                }
                return recipe
            } catch (error) {
                console.log(error)
            }
        },
        getMyRecipes: async(_:any,{input}:any,ctx:any) =>{
            console.log(ctx.user)
            try {
                const recipes = await getRepository(Recipe).find({id:ctx.user.id})
                return recipes 
            } catch (error) {
                console.log(error)
            }
        }
    },

    Mutation: {
        signUp: async (_:any, {input}:any) => {

            const {email, password} = input

            const userRepository  = getRepository(User)

            const existUser = await userRepository.findOne({email})
            if(existUser){
                throw new Error("User exists")
            }
            input.password=await bcryptjs.hash(password,10)

            try {
                const user = userRepository.create(input)
                const result = await userRepository.save(user)

                return result
            } catch (error) {
                console.log(error)
            }
            
        },

        login: async  (_:any, {input}:any) => {
            const {email, password} = input
            const userRepository  = getRepository(User)
            //si existe
            const user = await userRepository.findOne({email})
            if(!user){
                throw new Error ("User does not exist")
            }

            //password exists?
            const passwordCorrect = await bcryptjs.compare(password, user.password)
            if (!passwordCorrect) {
                throw new Error("Password incorrect")
            }

            //token
            return {
                token: createToken(user, 'SECRET', '24h')
            }


        },

        createCategory: async (_:any, {input}:any, ctx:any) => {
            const categoryRepository = getRepository(Category)
            try {
                const category = categoryRepository.create(input)
                const result = await categoryRepository.save(category)
                return result
            } catch (error) {
                console.log(error)
            }
        },
        updateCategory: async(_:any, {id,input}:any)=>{
            const categoryRepository  = getRepository(Category)
            let category = await categoryRepository.findOne({id})
            if(!category){
                throw new Error ('Category does not exists')
            }
            categoryRepository.merge(category,input)
            const result = await categoryRepository.save(category)
            return result
        },
        deleteCategory: async(_:any,{id}:any) => {
            const categoryRepository  = getRepository(Category)
            let category = await categoryRepository.findOne({id})
            if(!category){
                throw new Error ('Category does not exists')
            }
            const result = await categoryRepository.delete(id)
            return result ? "The category was eliminated" : ''

        },
        createRecipe: async(_:any,{input}:any,ctx:any)=>{
            let obj = {...input}
            obj.userId = ctx.user.id
            console.log("obj=== ",obj)
            const recipeRepository = getRepository(Recipe)
            try {
                const recipe = recipeRepository.create(obj)
                const result = await recipeRepository.save(recipe)
                return result
            } catch (error) {
                console.log(error)
            }
            console.log(input)
        },
        updateRecipe: async(_:any, {id,input}:any)=>{
            const recipeRepository  = getRepository(Recipe)
            let recipe = await recipeRepository.findOne({id})
            if(!recipe){
                throw new Error ('Recipe does not exists')
            }
            recipeRepository.merge(recipe,input)
            const result = await recipeRepository.save(recipe)
            return result
        },
        deleteRecipe: async(_:any,{id}:any) => {
            const recipeRepository  = getRepository(Recipe)
            let recipe = await recipeRepository.findOne({id})
            if(!recipe){
                throw new Error ('Recipe does not exists')
            }
            const result = await recipeRepository.delete(id)
            return result ? "The recipe was eliminated" : ''

        },
    }
}

export default resolvers