import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req?.method !== "GET"){
        return res.status(400).end()
    }
    try{
    const {postId} = req?.query;
    if(!postId || typeof postId !== 'string'){
        throw new Error("Post not found")
    }
    const post = await prisma.post.findUnique({
        where:{
            id:postId
        },
        include:{
            user:true,
            comments:{
                include:{
                    user:true,
                },
                orderBy:{
                    createdAt:'desc'
                }
            }
        },
        
    })
    return res.status(200).json(post);
}catch(error){
    return res.status(500).json({
        message:error instanceof Error ? error?.message : "Something went wrong"
    })
} 
}