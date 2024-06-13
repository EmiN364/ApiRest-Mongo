import { Schema, Types, model } from "mongoose";
import User from "./user";

export interface TaskInterface {
    title: string;
    description: string;
    completed: boolean;
    assigned_user?: string;
}

const TaskSchema = new Schema<TaskInterface>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true, default: true },
    assigned_user: { type: Types.ObjectId, ref: User, required: false }
}, { timestamps: true });

const Task = model<TaskInterface>('Task', TaskSchema);

export default Task;