import db from "../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {

    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          message: "Email and Password are required"
        },
        { status: 400 }
      );
    }

    const [rows] = await db.query(
      "SELECT * FROM login WHERE email=?",
      [email]
    );

    if (rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Invalid Email"
        },
        { status: 401 }
      );
    }

    const user = rows[0];

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return Response.json(
        {
          success: false,
          message: "Invalid Password"
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 2
    });

    return Response.json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    return Response.json(
      {
        success: false,
        message: err.message
      },
      { status: 500 }
    );
  }
}