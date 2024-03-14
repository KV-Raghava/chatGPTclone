import { Request, Response, NextFunction } from "express";
import User from "../models/User.js"
import { hash, compare } from "bcrypt";


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
        res.status(200).json({"message": "OK", user});
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
        return res.status(200).json({"message": "Login successful","id":user._id.toString()});
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