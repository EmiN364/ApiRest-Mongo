import { Schema, model } from "mongoose";

const issueSchema = new Schema({}, { strict: false });

const Issue = model("Issue", issueSchema);

export default Issue;
