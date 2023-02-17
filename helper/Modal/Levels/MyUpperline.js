import mongoose from "mongoose";

const MyUpperline = mongoose.Schema({

    MyUserid:{
        default: "null",
        type: "String",
    },
    MyUpperLines:{
        default: "null",
        type: "String",
    }
},
{
  timestamps: true,
}
)
export default mongoose.models.MyUpperli || mongoose.model("MyUpperli", MyUpperline);

