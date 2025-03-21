import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req?.method !== 'GET'){
        return res.status(400).end()
    }
    try{
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt:'desc'
            }
        })
        return res.status(200).json(users);

    }catch(error){
        return res.status(500).json({
            message:error instanceof Error ? error?.message : "Something went wrong"
        })
    }
}