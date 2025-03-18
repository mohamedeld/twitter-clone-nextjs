import { prisma } from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req?.method !== "POST"){
        return res.status(400).end()
    }
    try{
        const user = await serverAuth(req,res);
    const {body} = req?.body;
    const {postId} = req?.query;
    if(!postId || typeof postId !== 'string'){
        throw new Error("Post not found")
    }
    
    const comment = await prisma.comment.create({
        data:{
            body:body,
            userId:user?.id,
            postId:postId
        }
    })
    return res.status(201).json(comment);
}catch(error){
    return res.status(500).json({
        message:error instanceof Error ? error?.message : "Something went wrong"
    })
} 
}