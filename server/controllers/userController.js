import User from "../models/user.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv";

dotenv.config();

const getUser = async (req, res) => {
  try {
      const user = await User.find();
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ message: error.message })
  }

};

const register = async (req, res) => {
  try {
    const {email, username, password} = req.body;
    if (!email || !username || !password) return res.status(400).json({ 'message': 'email, username and password are required.' });
    
    const oldUser = await User.findOne({
      $or: [
      {email: email},
      {username: username}
      ]
    })
    
    if (oldUser) {
      return res.status(409).json({ message: "email or username exists"}) 
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body})
    newUser.password = encryptedPassword
    // const userForToken = {
    //   username: newUser.username,
    //   _id: newUser._id,
    // }
  
    // const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn:"1d"})
    newUser.save()
    res.status(201).json({  newUser })
  } catch (error) {
    //console.log(err)
    res.status(500).json( {message: error.message});
  }
};

const updateUser = async (req, res) => {
  try{
    const authHeader = String(req.headers['authorization'] || '');

    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      try {
        const verified = jwt.verify(token, process.env.SECRET)
      }catch(err) {
        if (err instanceof jwt.JsonWebTokenError) {
          // if the error thrown is because the JWT is unauthorized, return a 401 error
          return res.status(401).json({message: err.message})
        }
        // otherwise, return a bad request error
        return res.status(400).json({message: err.message})
      }

      const payload = jwt.decode(token, process.env.SECRET);

      if(!mongoose.Types.ObjectId.isValid(payload._id)) {
        return res.status(404).json({message: "This id doesn't exist"});
      }
      const user = req.body;
      if (user && user.password) {
        const encryptedPassword = await bcrypt.hash(user.password, 10);
        user.password = encryptedPassword
      }

      const updatedUser = await User.findByIdAndUpdate(payload._id, user, { new: true });
      return res.status(201).json(updatedUser);
    }
  }catch(error) {
        //console.log(error)
      return res.status(404).json({message: error.message});
  }
}

const deleteUser = async (req, res) => {
  try{
    const authHeader = String(req.headers['authorization'] || '');
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      
      try {
        const verified = jwt.verify(token, process.env.SECRET)
      }catch(err) {
        if (err instanceof jwt.JsonWebTokenError) {
          // if the error thrown is because the JWT is unauthorized, return a 401 error
          return res.status(401).json({message: err.message})
        }
        // otherwise, return a bad request error
        return res.status(400).json({message: err.message})
      }

      const payload =  jwt.decode(token, process.env.SECRET);

      if(!mongoose.Types.ObjectId.isValid(payload._id)) {
          return res.status(404).send("This id dosent exist");
      }

      await User.findByIdAndRemove(payload._id);

      return res.json({ message: "User has been deleted"});
      }
    }catch(err) {
      //console.log(err)
      return res.json( {message: err.message});
    }
};


const login = async(req, res) => {
  try {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    _id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn:"1d"})

  res
    .status(200)
    .cookie('jwt', token, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
    .json({ token, username: user.username })
  } catch (error) {
    //console.log(err)
    res.status(401).json( {message: error.message});
  }

}


const logout = async (req, res) => {
  const cookies = req.cookies
  //console.log(cookies)
  if (!cookies) return res.status(204)
  try {
    if (!cookies?.jwt) return res.status(204)

    const token = cookies.jwt
    const payload = jwt.decode(token, process.env.SECRET);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    //res.sendStatus(204);
    return res.json({message: 'cookie cleared'})
  }
  catch (e) {
    console.log(e)
    return res.json({message: e.message})
  }
}


const getCurrentUser = async (req, res) => {
  const cookies = req.cookies
  //console.log(cookies)
  if (!cookies) return res.status(204)
  try {
    if (!cookies?.jwt) return res.status(204)

    const token = cookies.jwt
    const payload = jwt.decode(token, process.env.SECRET);
    
    const user = await User.findById(payload._id)

    //res.sendStatus(204);
    return res.json(user)
  }
  catch (e) {
    console.log(e)
    return res.json({message: e.message})
  }
}

export { getUser, updateUser, deleteUser, login, register, logout, getCurrentUser };