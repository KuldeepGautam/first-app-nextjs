import { users } from "../../../../data";

// Get User by Ids
export async function GET(request, { params }) {
    const { id } = await params;

    const user = users.find(
        (item) => item.id === Number(id)
    );

    if (!user) {
        return Response.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    return Response.json(user);
}

// Update user by Ids
export async function  POST(params) {

   const body = await request.json();
   
   const index = users.findIndex((item) => {
      item.id === item.params
   })

   const 

}