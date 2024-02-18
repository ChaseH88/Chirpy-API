export default `
type Query {
  allUsers: [User!]!
}

type Mutation {
  createUser(data: CreateUserInput!): User!
  createPost(data: CreatePostInput!): Post!
}

input CreateUserInput {
  username: String!
  password: String!
  email: String!
}

input CreatePostInput {
  postedBy: ID!
  content: String!
}

type User {
  id: ID!
  username: String!
  password: String!
  email: String!
  posts: [Post!]!
  createdAt: Date!
  updatedAt: Date!
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
