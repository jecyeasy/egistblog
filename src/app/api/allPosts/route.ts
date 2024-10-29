import { NextResponse } from "next/server";
import { prisma } from "../user/route";



export async function GET(){
    try {
        const  posts  =  await  prisma.post.findMany({
            include:{
                tags:true,
                user:true
            }
        })

        if(posts){
            return  NextResponse.json({
                data:posts,
                message:"Posts successfully fetched ",
                statusbar:"success",
                statuscode:200
            })
        }
    } catch (error) {
        return  NextResponse.json({
            message:"Failed to fetch posts ",
            statusbar:"error",
            statuscode:500,
            error:error
        })
    }
}
