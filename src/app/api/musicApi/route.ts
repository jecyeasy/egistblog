import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";  // Correct import

export const prisma = new PrismaClient({
    log: ["error", "warn", "info"]
});

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                tags: true,
                user: true
            },
            where: {
                categoryId: 1
            }
        });

        // Check if posts exist, and return a response accordingly
        if (posts) {
            return NextResponse.json({
                data: posts,
                status: 200,
                message: "Posts successfully fetched",
                statusbar: "success"
            });
        } else {
            return NextResponse.json({
                data: [],
                status: 404,
                message: "No posts found",
                statusbar: "info"
            });
        }

    } catch (error) {
        // Simplify the error response for better readability
        return NextResponse.json({
            error: error,
            statusbar:"failed",
            statuscode:500
        });
    }
}
