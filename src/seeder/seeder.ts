import { GroupModel } from "../models/group";
import { PostModel } from "../models/post";
import { UserModel } from "../models/user";
import { groupFaker } from "./group-faker";
import { postFaker } from "./post-faker";
import { userFaker } from "./user-faker";
import { Database } from "../classes/database";
import { hashPassword } from "../utilities/password";

type SeederParams = {
  userCount: number;
  groupCount: number;
  postCount: number;
};

const defaultUser = async () =>
  userFaker({
    email: "chase@test.com",
    username: "chase",
    password: await hashPassword("chase"),
  });

new Database().start();

const seeder = async (params: SeederParams) => {
  const users = Array.from({ length: params.userCount - 1 }, (_, i) => i).map(
    () => userFaker()
  );

  users.push(await defaultUser());

  // Create Posts
  const groups = Array.from({ length: params.groupCount }, (_, i) => i).map(
    () => {
      const user =
        users[Math.floor(Math.random() * (users.length - 1 - 0 + 1)) + 0];
      const newGroup = groupFaker({
        createdById: user._id,
      });
      user.groups.push(newGroup._id);
      return newGroup;
    }
  );

  // Create Posts
  const posts = Array.from({ length: params.postCount }, (_, i) => i).map(
    () => {
      const user =
        users[Math.floor(Math.random() * (users.length - 1 - 0 + 1)) + 0];
      const newPost = postFaker({
        postedById: user._id,
      });
      user.posts.push(newPost._id);
      return newPost;
    }
  );

  const updatedPostWithLikesAndDislikes = posts.map((post) => {
    const randomUsers = users
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * (users.length - 1 - 0 + 1)) + 0);

    const likes = randomUsers.slice(0, Math.floor(randomUsers.length / 2));
    const dislikes = randomUsers.slice(
      Math.floor(randomUsers.length / 2),
      randomUsers.length
    );

    return {
      ...post,
      likes: likes.map((user) => user._id).filter((id) => id !== post.postedBy),
      dislikes: dislikes
        .map((user) => user._id)
        .filter((id) => id !== post.postedBy),
    };
  });

  const finalUsers = users;
  const finalGroups = groups;
  const finalPosts = updatedPostWithLikesAndDislikes;

  try {
    await UserModel.deleteMany({});
    await GroupModel.deleteMany({});
    await PostModel.deleteMany({});

    await UserModel.insertMany(finalUsers);
    await GroupModel.insertMany(finalGroups);
    await PostModel.insertMany(finalPosts);

    console.log("Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error("Error: ", error);
  }
};

seeder({ userCount: 20, groupCount: 7, postCount: 150 });
