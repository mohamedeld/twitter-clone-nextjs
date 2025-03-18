import { prisma } from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req?.method !== 'DELETE' && req?.method !== 'POST'){
        return res?.status(405)?.end();
    }
    try{
        const {userId} =req?.body;
        
        const currentUser = await serverAuth(req,res);
        if(!userId || typeof userId !== 'string'){
            throw new Error("Invalid ID");
        }
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!user){
            throw new Error("Invalid id")
        }
        let updatedFollowingIds = [...(currentUser.followingIds || [])];
        if (req.method === "POST") {
            if (!updatedFollowingIds.includes(userId)) {
                updatedFollowingIds.push(userId); // Add userId if not already following
            }
        } else if (req.method === "DELETE") {
            updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId); // Remove userId
        }
        const updatedUser = await prisma.user.update({
            where:{
                id:currentUser?.id
            },
            data:{
                followingIds:updatedFollowingIds
            }
        })
        return res.status(200).json(updatedUser)
    }catch(error){
        return res.status(500).json({
            message:error instanceof Error ? error?.message : "Something went wrong"
        })
    }
}