import { connect, disconnect } from "mongoose";

export async function connectionToDB(){
  try{
    await connect(process.env.MONGODB_URL )
    console.log('Connected to MongoDB')
    return true;
  }
  
  catch(err){
      console.log(`ERROR : ${err}`);
      throw new Error("Couldn't connect to mongoDB");
      
  }
}

export async function disconnectFromDB(){
 try{
    await disconnect();
 }
 catch(err){
    console.log(`ERROR : ${err}`);
 }
}