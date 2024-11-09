import {gql} from 'graphql-tag';

const typeDefs = gql`
    type user {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    type Auth {
        token: ID!
        user: user
    }
    type BookInput {
        authors: [String]
        description: String
        title: String
        bookId: ID!
        image: String
        link: String
    }
    type Query {
        me: user
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): user
        removeBook(bookId: ID!): user
    }
    `;
export default typeDefs;