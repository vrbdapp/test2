import mongoose from "mongoose";

const TeamRecord = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    totalMembers: {
        type: Number,
        required: true,
    },
    totalBussiness: {
        type: Number,
        required: true
    }
}, {timestamps: true});

export default mongoose.models.TeamRecord || mongoose.model("TeamRecord", TeamRecord);
