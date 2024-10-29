import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export const prisma = new PrismaClient({
    log:["error", "warn", "info"]
})

export async function POST(request:Request){
    try{
        const {email, password, fullname, role}=await request.json();
        const hashedPassword = await bcrypt.hash(password,10)

        const user = await prisma.user.create({
            data:{
                email:email,
                password:hashedPassword,
                fullname:fullname,
                role:role
            }
        })
if(user){
    return NextResponse.json({
        message:"user seccessfully created",
        statusbar:"success",
        status:200,
        data:user
    })
}
   
}catch(error){
    console.log(error)
    return NextResponse.json({
        error:error,
        status:500,
        statusbar:"error" 
    })
}
}