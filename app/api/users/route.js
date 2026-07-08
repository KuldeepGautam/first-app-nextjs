import db from "../../lib/db";

// Get all user
export async function GET() {

    try {

        const [rows] = await db.query("SELECT * FROM users");

        return Response.json(rows);

    } catch (error) {

        return Response.json(
            {
                message: error.message,
            },
            {
                status: 500
            }
        )
    }
}

// Creagte New User
export async function POST(request) {

    try {
        const body = await request.json();

        const { name, email, age } = body;

        const [duplicateUser] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (duplicateUser.length > 0) {
            return Response.json(
                {
                    success: false,
                    message: "User already exist..!"
                },
                {
                    status: 409
                }
            )
        }

        // Insert into DB
        const [result] = await db.query(
            "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
            [name, email, age]
        )

        return Response.json(
            {
                success: true,
                message: 'Data submitted successfully..!',
                data: {
                    id: result.insertId,
                    name,
                    email,
                    age
                }
            },
            {
                status: 201
            },

        )
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500
            }
        )
    }
}
