// File: app/api/validate-admin-key/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { password } = await req.json();
    const isValid = password === process.env.ADMIN_KEY; // Use server-side env variable

    return NextResponse.json({ valid: isValid });
}
