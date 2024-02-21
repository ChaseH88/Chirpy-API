export default `
type Query {
  allUsers: [User!]!
  allPosts: [Post!]!
  trendingPosts: [Post!]!
  currentUser(token: String!): User!
}

type Mutation {
  createUser(data: CreateUserInput!): AuthLogin!
  createPost(data: CreatePostInput!): Post!
  createPostComment(data: CreatePostCommentInput!): String
  likePost(data: LikePostInput!): String
  dislikePost(data: DislikePostInput!): String
  deleteUser(id: ID!): String
  deletePost(id: ID!): String
  login(data: LoginInput!): AuthLogin!
}

input CreateUserInput {
  username: String!
  password: String!
  email: String!
}

input LoginInput {
  username: String!
  password: String!
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
  token: String
}

type AuthLogin {
  user: User!
  token: String!
}

type Post {
  id: ID!
  postedBy: User!
  content: String!
  likes: [User!]!
  dislikes: [User!]!
  comments: [Comment!]!
  createdAt: Date!
  updatedAt: Date!
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
