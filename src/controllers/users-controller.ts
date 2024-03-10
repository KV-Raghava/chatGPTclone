import { Request, Response, NextFunction } from "express";
import User from "../models/User.js"
import { hash } from "bcrypt";


export const userSignUp = async (
    req:Request,
    res:Response,
    next:NextFunction)=>{
    try{
        const {name, email, password} = req.body;
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