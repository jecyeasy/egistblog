import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../user/route";



export  async function POST(request:Request){
    try {
        const  {name} = await  request.json();

        const  category  =  await  prisma.category.create({
            data: {
                name:name
            }
        })

        if(category){
            return  NextResponse.json({
                message:"category  successfully created ",
                statusbar:"success",
                statuscode:200
            })
        }
    } catch (error) {
        console.log(error)
        return  NextResponse.json({
            message:"Failed to create category ",
            statusbar:"error",
            statuscode:500
        })
    }
}