import { NextResponse } from "next/server"

import { PrismaClient } from "@prisma/client"


const  prisma  =  new PrismaClient()


export async  function  POST(request: Request){
    try {
        const  {content,  slug, title, image, description, categoryId, tags, userId} = await  request.json()

        const  user  = await  prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        console.log(user)

    if(user?.role !== "AUTHOR" && user?.role !== "ADMIN"){
        return  NextResponse.json(
        {
            message: "You are not authorized to perform this action",
            status:403
        }
        )
    }
    
    
        const  post  =  await  prisma.post.create({
            data: {
                content:content,
                slug:slug,
                title:title,
                image:image,
                description:description,
                category:{
                    connect:{
                        id:categoryId
                    }
                },
                user:{
                    connect:{
                        id:userId
                    }
                },

                tags:{
                    connectOrCreate:tags.map((tag:any)=>({
                        where:{name:tag.name},
                        create:{name:tag.name}
                    }))
                }
   
            }
    
        })

        if(post){
            return  NextResponse.json({
                message:"post successfully created ",
                statusbar:"success",
                statuscode:200
            })
        }
    } catch (error) {
        return NextResponse.json({
            error: error,
            statusbar:"failed",
            statuscode:500
        })
    }
}