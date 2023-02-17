import mongoose from "mongoose";


const ShortRecord = new mongoose.Schema({
    RecordOwner: {
        type:"String",
        default:"null"
    },
    AllTimeLevelBusiness: {
        type: Number,
        default:0
    },
    AllTimeDailyBusiness: {
        type: Number,
        default:0
    },
    AllTimeCareerReward: {
        type: Number,
        default:0,
    },
    AllMyDirectPeople: {
        type: Number,
        default:0,
    },
    AllMyDirectBusiness: {
        type: Number,
        default:0,
    }
}, {timestamps: true});

export default mongoose.models.ShortRecordd || mongoose.model("ShortRecordd", ShortRecord);

