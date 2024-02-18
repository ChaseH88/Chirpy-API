export default `
type Query {
  allUsers: [User!]!
}

type Mutation {
  createUser(data: CreateUserInput!): User!
}

input CreateUserInput {
  username: String!
  password: String!
  email: String!
}

type User {
  id: ID!
  username: String!
  password: String!
  email: String!
}

type Post {
  id: ID!
  postedBy: User!
  content: String!
  likes: [User!]!
  dislikes: [User!]!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  user: User!
  comment: String!
  createdAt: Date!
  updatedAt: Date!
}

scalar Date
`;
