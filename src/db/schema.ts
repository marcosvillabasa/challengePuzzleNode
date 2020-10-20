import { gql } from 'apollo-server-express';

const typeDefs = gql`

    type Token {
        token: String
    }

    type User {
        id: ID
        name: String
        email: String
        password: String
        recipes: [Recipe]
    }
    type Recipe {
        id: ID
        name: String
        description: String
        ingredients: String
        categoryId: ID
        userId: ID
    }
    type Category {
        id: ID
        description: String
        recipes: [Recipe]
    }

    input UserInput {
        name:String!
        email: String!
        password: String!
        recipes: [String]
    }
    input AuthInput {
        email: String!
        password: String!
    }

    input CategoryInput{
        description: String!
        recipes: [String]
    }
    input RecipeInput {
        name: String!
        description: String!
        ingredients: String!
        categoryId: ID
        userId: ID
    }

	type Query {
        #Usuarios
        getUsers: [User]
        login(token: String!): User

        # Category
        getCategories: [Category]
        getOneCategory(id:ID!): Category

        # Recipes
        getRecipes: [Recipe]
        getOneRecipe(id:ID!): Recipe
        getMyRecipes: [Recipe]
        
    }
    
    type Mutation {
        # User
        signUp(input: UserInput): User
        login(input: AuthInput) : Token

        # Category
        createCategory(input: CategoryInput): Category
        updateCategory(id:ID!,input: CategoryInput): Category
        deleteCategory(id:ID!): String

        # Recipe
        createRecipe(input: RecipeInput) : Recipe
        updateRecipe(id: ID!, input:RecipeInput): Recipe
        deleteRecipe(id:ID) : String
    }
`;

export default typeDefs;
