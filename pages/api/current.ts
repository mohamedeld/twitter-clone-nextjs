import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try{
        if(req?.method !== 'GET'){
            return res.status(403).end();
        }    
        const user = await serverAuth(req,res);

        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({
            message:error instanceof Error ? error?.message : "Something went wrong"
        })
    }
}