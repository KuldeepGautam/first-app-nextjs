import db from "../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO login (name, email, password) VALUES (?, ?, ?)",
            [name, email, hash]
        );

        return Response.json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}
