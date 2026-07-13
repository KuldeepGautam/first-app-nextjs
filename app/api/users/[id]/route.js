import db from "../../../lib/db";

// Get User by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: rows[0],
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

// Update user by Ids
export async function PUT(request, {params}) {
    try {

        const {id} = await params;

        const body = await request.json();

        const { name, email, age } = body;

        // Check if user exists
        const [user] = await db.query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );

        if(user.length === 0){
            return Response.json(
                {
                    success: false,
                    message: "User not found...!"
                },
                {
                    status: 404
                }
            )
        }

        // Update user
        await db.query(
            "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
            [name, email, age, id]
        );
        
        return Response.json(
            {
                success: true,
                message: 'Data updated successfully...!'
            },
            {
                status: 200
            }
        )

    } catch (error) {
          return Response.json(
            {
                success: false,
                message: error.message
            },
            {
                status: 500
            }
          )
    }
}