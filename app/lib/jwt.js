import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export function createPool(user){
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        SECRET,
        {
            expiresIn: "id"
        }
    )
}

export function verifyToken(token){
    return jwt.verify(token, SECRET);
}