const mongoose = require("mongoose");``

const MyTotalEarning = mongoose.Schema({
    RecordOwner:{
        default: "null",
        type: "String",
    },
    TotalEarning:{
        default: 0,
        type: "Number",
    }   
  },
  {
    timestamps: true,
  }
);
// module.exports = mongoose.model("MyTotalEarning", MyTotalEarning);
export default mongoose.models.MyTotalEarning || mongoose.model("MyTotalEarning", MyTotalEarning);

