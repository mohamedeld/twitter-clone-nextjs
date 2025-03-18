import { prisma } from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.method !== "POST" && req?.method !== "DELETE") {
    return res.status(400).end();
  }
  try {
    const { postId } = req.body;
    const user = await serverAuth(req, res);
    console.log("post id ",postId)
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid id");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      throw new Error("Invalid post");
    }
    let updatedLikedIds = [...(post?.linkedIds || [])];
    if (req?.method === "POST") {
      if (!updatedLikedIds.includes(user?.id)) {
        updatedLikedIds.push(user?.id); // Add userId if not already following
      }
    } else if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter((likeId) => likeId !== user?.id); // Remove userId
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        linkedIds: updatedLikedIds,
      },
    });
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error?.message : "Something went wrong",
    });
  }
}
