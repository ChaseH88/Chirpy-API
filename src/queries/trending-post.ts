import { PostModel } from "../models/post";

const POSTS_TO_RETURN = 3;

const calculatePostScore = (
  commentsCount: number,
  likesCount: number,
  dislikesCount: number
): number => {
  const commentWeight = 2;
  const likeWeight = 1.5;
  const dislikeWeight = -2;

  return (
    commentsCount * commentWeight +
    likesCount * likeWeight +
    dislikesCount * dislikeWeight
  );
};

export const trendingPosts = async () => {
  const posts = await PostModel.find().populate([
    {
      path: "postedBy",
      model: "UserModel",
      select: "-password",
    },
    {
      path: "likes",
      model: "UserModel",
      select: "-password",
    },
    {
      path: "dislikes",
      model: "UserModel",
      select: "-password",
    },
    {
      path: "comments",
      model: "CommentModel",
      populate: {
        path: "user",
        model: "UserModel",
        select: "-password",
      },
    },
  ]);

  const scores: { post: any; score: number }[] = [];

  posts.forEach((post) => {
    const commentsCount = post.comments.length;
    const likesCount = post.likes.length;
    const dislikesCount = post.dislikes.length;

    scores.push({
      post,
      score: calculatePostScore(commentsCount, likesCount, dislikesCount),
    });
  });
  return (
    scores
      ?.sort((a, b) => b.score - a.score)
      ?.slice(0, POSTS_TO_RETURN)
      ?.map((score) => score.post) || []
  );
};
