import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verifyJWT = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies) return res.status(204)
  try {
    if (!cookies?.jwt) return res.status(204)

    const token = cookies.jwt
    jwt.verify(
      token,
      process.env.SECRET,
      (err, decoded) => {
          if (err) return res.sendStatus(403); //invalid token
          req.user = decoded.username;
          req._id = decoded._id
          next();
      }
  );
  }catch (e) {
    console.log(e)
  }
  
}

export default verifyJWT
