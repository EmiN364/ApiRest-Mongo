import { Schema, model } from "mongoose";

export interface UserInterface {
    username: string;
    email: string;
    bio?: string;
    age: number;
}

const UserSchema = new Schema<UserInterface>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: false },
    age: { type: Number, required: true },
});

const User = model<UserInterface>('User', UserSchema);

export default User;