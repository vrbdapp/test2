import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";

initDB();

export default async (req, res) => {
    const {id} = req.body

    var fins2 = await User.findById(id)

    var myDownLine = []

    var findDowns = await User.findOne({UpperLineSponserUser:fins2.WalletAddress})

    while (findDowns) {
        
        myDownLine.push({WalletId:findDowns.WalletAddress,WalletAmount:findDowns.Wallete})

       findDowns = await User.findOne({UpperLineSponserUser:findDowns.WalletAddress})
    }

  res.json(myDownLine)
};

