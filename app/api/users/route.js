import { users } from "../../../data";

// Get all user
export async function GET() {
    return Response.json(users);
}

// Creagte New User
export async function POST(request) {

    const body = await request.json();

    const duplicateUser = users.find((user) => {
        return user.email === body.email;
    });

    if (duplicateUser) {
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
    const newUser = {
        id: Date.now(),
        ...body
    }

    users.push(newUser)

    return Response.json(
        {
            success: true,
            message: 'Data submitted successfully..!',
            data: newUser
        },
        {
            status: 201
        }
    )

    return Response.json(newUser)
}
