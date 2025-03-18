import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"


const serverAuth =  async (req:NextApiRequest, res:NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    return session?.user
  } else {
    return null;
  }
}

export default serverAuth;