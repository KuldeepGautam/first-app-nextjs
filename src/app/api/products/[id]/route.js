import { verifyUser } from "../../../lib/auth";
import db from "../../../lib/db";

// Get Product by ID
export async function GET(request, { params }) {

  const user = await verifyUser();

  if (!user) {
    return Response.json(
      { success: false, message: "Token is not found." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const [rows] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
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

// Update Product by ID
export async function PUT(request, { params }) {

  const user = await verifyUser();

  if (!user) {
    return Response.json(
      { success: false, message: "Token not found." },
      { status: 401 }
    );
  }

  try {

    const { id } = await params;

    const body = await request.json();

    const { product_name, category, price, stock, status, image, description } = body;

    // Check if product exists
    const [existingProducts] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (existingProducts.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Product not found...!"
        },
        {
          status: 404
        }
      )
    }

    if (product_name) {
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
    }

    const updates = { product_name, category, price, stock, status, image, description };
    const setClauses = [];
    const values = [];

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        setClauses.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (setClauses.length > 0) {
      values.push(id);
      // Update product
      await db.query(
        `UPDATE products SET ${setClauses.join(', ')} WHERE id = ?`,
        values
      );
    }

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

// Delete Product by ID
export async function DELETE(request, { params }) {

  const user = await verifyUser();

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "Token not found."
      },
      {
        status: 401
      }
    );
  }

  try {
    const { id } = await params;

    // Check if user exists
    const [rows] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Product not found...!"
        },
        {
          status: 404
        }
      );
    }

    // Delete product
    await db.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    return Response.json(
      {
        success: true,
        message: "Product deleted successfully...!"
      },
      {
        status: 200
      }
    );

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message
      },
      {
        status: 500
      }
    );
  }
}