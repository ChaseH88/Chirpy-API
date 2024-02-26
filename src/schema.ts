export default `
type Query {
  allUsers: [User!]!
  allPosts(nextToken: Int, limit: Int): PaginatedPosts!
  allGroups: [Group!]!
  trendingPosts: [Post!]!
  currentUser: User!
  findUser(id: ID!): User!
  findGroup(id: ID!): Group!
  findPost(id: ID!): Post!
  search(search: String!, type: [SearchType!]!): SearchResults!
}

type Mutation {
  createUser(data: CreateUserInput!): AuthLogin!
  editUser(id: ID!, data: EditUserInput!): User!
  createPost(data: CreatePostInput!): Post!
  createPostComment(data: CreatePostCommentInput!): String
  likePost(data: LikePostInput!): String
  dislikePost(data: DislikePostInput!): String
  deleteUser(id: ID!): String
  deletePost(id: ID!): String
  login(data: LoginInput!): AuthLogin!
  createGroup(data: CreateGroupInput!): Group!
  editGroup(data: EditGroupInput!): Group!
  editGroupUsers(data: EditGroupUsersInput!): Group!
  deleteGroup(groupId: ID!): String
}

type SearchResults {
  users: [User!]
  posts: [Post!]
  groups: [Group!]
}

type PaginatedPosts {
  items: [Post!]!
  nextToken: String
  totalCount: Int
}

enum SearchType {
  USER
  POST
  GROUP
}

enum EditGroupUsersType {
  MODERATOR
  MEMBER
}

enum EditGroupUsersAction {
  ADD
  REMOVE
}

input CreateUserInput {
  username: String!
  password: String!
  email: String!
}

input EditUserInput {
  email: String
  username: String
  firstName: String
  lastName: String
  bio: String
  photo: String
}

input LoginInput {
  username: String!
  password: String!
}

input CreatePostInput {
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
  firstName: String
  lastName: String
  bio: String
  photo: String
  email: String!
  posts: [Post!]
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

type Group {
  id: ID!
  name: String!
  description: String
  location: String
  createdBy: User!
  moderators: [User!]!
  members: [User!]!
  posts: [Post!]!
  createdAt: Date!
  updatedAt: Date!
}

input CreateGroupInput {
  name: String!
  description: String
  location: String
  createdBy: ID!
}

input EditGroupInput {
  id: ID!
  name: String
  description: String
  location: String
}

input EditGroupUsersInput {
  groupId: ID!
  userId: [ID!]!
  type: EditGroupUsersType!
  action: EditGroupUsersAction!
}

input DeleteGroupInput {
  token: String!
  groupId: ID!
}

scalar Date
`;
