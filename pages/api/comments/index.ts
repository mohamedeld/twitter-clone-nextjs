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
    try{
      const post = await prisma.post.findUnique({
        where:{
          id:postId
        }
      })
      if(post?.userId){
        await prisma.notification.create({
          data:{
            body:'Someone replied to your tweet',
            userId:post?.userId
          }
        })
        await prisma.user.update({
          where:{
            id:post?.userId
          },
          data:{
            hasNotification:true
          }
        })
      }
    }catch(error){
      return res.status(500).json({
        message: error instanceof Error ? error?.message : "Something went wrong",
      });
    }
    return res.status(201).json(comment);
}catch(error){
    return res.status(500).json({
        message:error instanceof Error ? error?.message : "Something went wrong"
    })
} 
}