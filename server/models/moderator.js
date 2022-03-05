import mongoose from "mongoose";

const moderatorSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("Moderator", moderatorSchema);