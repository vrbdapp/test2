import initDB from "../../../helper/initDB";
import WithdrawRecord from "../../../helper/Modal/Records/WithdrawRecord";
import User from "../../../helper/Modal/User";
import ShortRecord from "../../../helper/Modal/ShortRecord";
import DepositRecord from "../../../helper/Modal/Records/DepositRecord";
import Withdrawal from "../../../helper/Modal/ShortRecords/Withdrawal";

initDB();

export default async (req, res) => {
  const { id, amount, hash } = req.body;


  
  


  const getUserWallet = await User.findById(id)


  const getPackage = await DepositRecord.find({ RecordOwner: id })


  var totalStakedAmount = 0  // Total Staked This is This

  getPackage.map((hit) => {
    return totalStakedAmount = totalStakedAmount + Number(hit.DepositAmount)
  })


  var AmountPercantages = totalStakedAmount * 300 / 100  // 300% is this 




  let totWithdrawal = 0 // Total withdrawal is this

  const findTotalWithdrawal = await WithdrawRecord.find({ RecordOwner: id })


  findTotalWithdrawal.map((hit) => {
    return totWithdrawal = totWithdrawal + Number(hit.WithdrawAmount)
  })


  const Find300Data = await ShortRecord.findOne({ RecordOwner: id })


  if (Find300Data) {


    let DailyEarnings = Find300Data.AllTimeDailyBusiness
    let CareerEarnings = Find300Data.AllTimeCareerReward
    let LevelEarnings = Find300Data.AllTimeLevelBusiness

    var sumss = DailyEarnings + CareerEarnings + LevelEarnings - Number(totWithdrawal) // Avalible Balance is this




  } else {

    var sumss = 0   // Avalible Balance is this

  }






  let WithdrawalToGet = Number(AmountPercantages) - Number(totWithdrawal)


  var WithdrawThisMuch = 0

  var lapsWallet = 0



  if (WithdrawalToGet > sumss) {

    lapsWallet = Number(sumss) - Number(WithdrawalToGet)






  } else {








  }




  var MyWallet = getUserWallet.Wallete



  if (MyWallet == "null") {
    MyWallet = 0
  }


  var crWall = Number(MyWallet) - Number(amount)


  const updateWallet = await User.findByIdAndUpdate({ _id: id }, { Wallete: crWall })


  /*
  ! CREATING SHORT RECORD FOR TOTAL EARNING
  */

  const Find_Total_Earning_Short_Record = await Withdrawal.findOne({ RecordOwner: id })

  

  if (!Find_Total_Earning_Short_Record) {

    
    
    await Withdrawal.create({
      RecordOwner: id,
      WithdrawAmount: Number(amount)
    })
    
  } else {
    
    
    await Withdrawal.findByIdAndUpdate({ _id: Find_Total_Earning_Short_Record._id }, { $inc: { WithdrawAmount: Number(amount) } })

  }



  /*
    !--------------------------------------------------------------------------------
  */




  const WithdrawRecordss = WithdrawRecord({

    RecordOwner: id,
    OldWallet: MyWallet,
    WithdrawAmount: Number(amount),
    Commision: "null",
    LykaToken: "null",
    TransactionHash: hash

  }).save()




  res.json("updated wallet")
};