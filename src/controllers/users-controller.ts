import { Request, Response, NextFunction } from "express";
import User from "../models/User.js"
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manger.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignUp = async (
    req:Request,
    res:Response,
    next:NextFunction)=>{
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){return res.status(401).json({"message": "User already exists"});}
        const hashedPassword = await hash(password, 10);
        const user = new User({name, email, password:hashedPassword});
        await user.save();
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.cookie(COOKIE_NAME,token,
        {path:"/", 
        domain: "localhost",
        expires,
        signed:true,
        httpOnly: true});
        res.status(200).json({"message": "OK",
         "name":user.name, "email": user.email});
    }
    catch(err){
        console.log(err);
        res.status(200).json({"message": "ERROR", "cause": err.message});
    }
}

export const userLogin = async (
    req:Request,
    res:Response,
    next:NextFunction)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){return res.status(401).json({"message": "User not found"});}
        const isMatch = await compare(password, user.password);
        if(!isMatch){
            return res.status(403).json({"message": "Incorrect password"});}
        res.clearCookie(COOKIE_NAME,
            {path:"/", 
            domain: "localhost",
            signed:true,
            httpOnly: true});    
        
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain:"localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
        return res.status(200).json(
            {"message": "Login successful",
            "name":user.name, "email": user.email});
    }   
        
    catch(err){
        console.log(err);
        res.status(200).json({"message": "ERROR", "cause": err.message});
    }
}

export const getAllUsers = async (
    req:Request,
    res:Response,
    next:NextFunction)=>{
    try{
        const users = await User.find();
        res.status(200).json({"message": "OK", users});
    }
    catch(err){
        console.log(err);
        res.status(200).json({"message": "ERROR", "cause": err.message});
    }
}

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};