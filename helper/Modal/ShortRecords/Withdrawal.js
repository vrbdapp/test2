import mongoose from "mongoose";


const Withdrawal = mongoose.Schema({

    RecordOwner: {
        default: "null",
        type: "String",
    },
    WithdrawAmount: {
        default: 0,
        type: "Number",
    }

},
    {
        timestamps: true,
    })
export default mongoose.models.Withdrawal || mongoose.model("Withdrawal", Withdrawal);
