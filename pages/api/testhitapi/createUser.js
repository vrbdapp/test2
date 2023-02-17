import initDB from "../../../helper/initDB";
import WithdrawRecord from "../../../helper/Modal/Records/WithdrawRecord";
import DepositRecord from "../../../helper/Modal/Records/DepositRecord";
import User from "../../../helper/Modal/User";

initDB();

export default async (req, res) => {
  const { mynewwal,upperlineSponserCode,WalletAmount} = req.body;



  const createUser = await User({
    WalletAddress:mynewwal,
    UpperLineSponserUser:upperlineSponserCode,
    Wallete:WalletAmount,
    RechargeWallete:WalletAmount
  }).save()

  var Dates = new Date()

  var getDay = Dates.getDate()
  var getMonth = Dates.getMonth()+1
  var getYear = Dates.getFullYear()

  const purchasePackage = await DepositRecord({


    RecordOwner:createUser._id,
    OldWallet:"0",
    DepositAmount:WalletAmount,
    Commision:"0",
    LykaToken:"0",
    TransactionHash:"egrhreherh",
    Date:getYear+"-"+getMonth+"-"+getDay



  }).save()











  res.json({userData:createUser,purchasedPackage:purchasePackage})
};

