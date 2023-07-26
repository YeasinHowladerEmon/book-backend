import { Schema, model } from "mongoose";
import { ILoginAndUser, UserModel } from "./auth.interface";

export const UserSchema = new Schema<ILoginAndUser, UserModel>({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,      
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})


export const User = model<ILoginAndUser, UserModel>("User", UserSchema);