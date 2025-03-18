import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).end();
    }
    try{
        const {email,username,name,password} = req?.body;
        const user = await prisma.user.findUnique({
            where:{email:email}
        })
        if(user){
            return res.status(405).json({
                message:"user is already exist"
            });
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = await prisma.user.create({
            data:{
                name,
                username,
                email,
                hashedPassword
            }
        }) 
        return res.status(201).json({
            message:`${newUser?.name} created successfully`
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:error instanceof Error ? error?.message : "Something went wrong"
        })
    }
} 