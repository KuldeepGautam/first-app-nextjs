import db from "../../lib/db";
import { verifyUser } from "../../lib/auth";

// Get all user
export async function GET() {

    const user = await verifyUser();

    if (!user) {
        return Response.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const [rows] = await db.query("SELECT * FROM products");
        return Response.json(rows);
    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        )
    }
}

// Create New Product
export async function POST(request) {

    const user = await verifyUser();

    if (!user) {
        return Response.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();

        let { product_name, category, price, stock, status, image, description } = body;

        if (status === 'Active' || status === 'active') {
            status = 'In Stock';
        } else if (status === 'Inactive' || status === 'inactive') {
            status = 'Out of Stock';
        }


        const [duplicateProducts] = await db.query(
            "SELECT * FROM products WHERE product_name = ?",
            [product_name]
        );

        if (duplicateProducts.length > 0) {
            return Response.json(
                {
                    success: false,
                    message: "Product already exists!"
                },
                {
                    status: 409
                }
            )
        }

        // Insert into DB
        const [result] = await db.query(
            "INSERT INTO products (product_name, category, price, stock, status, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [product_name, category, price, stock, status, image, description]
        )

        return Response.json(
            {
                success: true,
                message: 'Product created successfully!',
                data: {
                    id: result.insertId,
                    product_name,
                    category,
                    price,
                    stock,
                    status,
                    image,
                    description
                }
            },
            {
                status: 201
            }
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
