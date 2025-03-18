import { prisma } from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req?.method !== "POST" && req?.method !== "GET"){
        return res.status(400).end()
    }
    try{
        if(req?.method === "POST"){
            const user = await serverAuth(req,res);
            const {body} = req?.body;
            const post = await prisma.post.create({
                data:{
                    body:body,
                    userId:user?.id
                }
            })
            return res?.status(201)?.json(post)
        }
        if(req?.method === 'GET'){
            const {userId} = req?.query;
            let posts;
            if(userId&& typeof userId === 'string'){
                posts = await prisma.post.findMany({
                    where:{
                        userId:userId
                    },
                    include:{
                        user:true,
                        comments:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                })
            }else{
                posts = await prisma.post.findMany({
                    include:{
                        user:true,
                        comments:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                })
            }
            return res?.status(200).json(posts);
        }
}catch(error){
    return res.status(500).json({
        message:error instanceof Error ? error?.message : "Something went wrong"
    })
} 
}