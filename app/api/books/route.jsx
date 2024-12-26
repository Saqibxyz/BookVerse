import clientPromise from "@/app/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Utility Functions
function validateObjectId(id) {
    return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

function validateBookData(book) {
    if (!book || typeof book !== "object") return false;
    const { title, author, publishedYear, link } = book;
    return (
        typeof title === "string" &&
        title.trim().length > 0 &&
        typeof author === "string" &&
        author.trim().length > 0 &&
        typeof link === "string" &&
        link.trim().length > 0 &&
        Number.isInteger(publishedYear) &&
        publishedYear > 0
    );
}

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

export async function POST(req) {
    try {
        const book = await req.json();
        if (!validateBookData(book)) {
            return NextResponse.json({ error: "Invalid book data" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("mydb");
        const collection = db.collection("books");

        const result = await collection.insertOne(book);
        return NextResponse.json({ message: "Book added successfully", result }, { status: 201 });
    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, ...data } = await req.json();

        if (!validateObjectId(id) || !validateBookData(data)) {
            return NextResponse.json({ error: "Invalid ID or data" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("mydb");
        const collection = db.collection("books");

        const result = await collection.replaceOne({ _id: new ObjectId(id) }, data);
        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Book updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in PUT:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const { id, ...data } = await req.json();

        if (!validateObjectId(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // Ensure at least one valid field is being updated
        const validFields = ["title", "author", "publishedYear", "link"];
        const updateFields = Object.keys(data).filter((field) => validFields.includes(field));

        if (updateFields.length === 0) {
            return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("mydb");
        const collection = db.collection("books");

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Book updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in PATCH:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();

        if (!validateObjectId(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("mydb");
        const collection = db.collection("books");

        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Book deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in DELETE:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
