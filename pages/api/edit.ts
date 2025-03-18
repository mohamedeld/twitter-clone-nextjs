import { prisma } from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.method !== "PATCH") {
    return res.status(403).end();
  }
  try {
    const user = await serverAuth(req, res);
    const { name, username, bio, profileImage, coverImage } = req?.body;
    if (!name || !username) {
      throw new Error("Missing fields");
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });
    return res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error?.message : "Something went wrong",
    });
  }
}
