import clientPromise from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const client = await clientPromise;
        const db = client.db("mydb");
        const collection = db.collection("books");

        const { searchParams } = new URL(req.url);
        const query = {};

        if (searchParams.get("author")) {
            query.author = { $regex: `^${searchParams.get("author")}`, $options: "i" };
        }
        if (searchParams.get("title")) {
            query.title = { $regex: `^${searchParams.get("title")}`, $options: "i" };
        }
        if (searchParams.get("publishedYear")) {
            const year = parseInt(searchParams.get("publishedYear"));
            if (!Number.isNaN(year)) query.publishedYear = year;
        }

        const books = await collection.find(query).toArray();
        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        console.error("Error in GET:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}