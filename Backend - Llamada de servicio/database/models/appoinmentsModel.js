import { Schema, model } from "mongoose";  



export const appointmentSchema = new Schema({
    name:String, 
    lastName: String, 
    email: String, 
    cellphone: Number, 
    date : String, 
    hour:  String, 
    service: String, 
    moto:  String, 
    chasis:  String, 
    state:  Array, 
},{versionKey:false})

export const AppoinmentsModel = model("appoinments", appointmentSchema);
