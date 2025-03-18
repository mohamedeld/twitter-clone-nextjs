import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req?.method !== 'GET'){
    return res.status(400).end()
    }
    try{
        const {userId} = req?.query;
        if(!userId || typeof userId !== 'string'){
            return res.status(404).json({
                message:"User is not found"
            })
        }
        const user = await prisma.user.findFirst({
            where:{
                id:userId
            }
        })
        const followingCount  = await prisma.user.count({
            where:{
                followingIds:{
                    has:userId
                }
            }
        })
        return res.status(200).json({
            ...user,followingCount
        });

    }catch(error){
        return res.status(500).json({
            message:error instanceof Error ? error?.message : "Something went wrong"
        })
    }
}