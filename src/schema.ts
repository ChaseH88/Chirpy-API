export default `
type Query {
  allUsers: [User!]!
  allPosts: [Post!]!
}

type Mutation {
  createUser(data: CreateUserInput!): User!
  createPost(data: CreatePostInput!): Post!
  createPostComment(data: CreatePostCommentInput!): String
  likePost(data: LikePostInput!): String
  dislikePost(data: DislikePostInput!): String
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

input CreatePostCommentInput {
  postId: ID!
  userId: ID!
  comment: String!
}

input LikePostInput {
  postId: ID!
  userId: ID!
}

input DislikePostInput {
  postId: ID!
  userId: ID!
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
