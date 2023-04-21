import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import DepositRecord from "../../../helper/Modal/Records/DepositRecord";
import MyUpperline from "../../../helper/Modal/Levels/MyUpperline";
import ShortRecord from "../../../helper/Modal/ShortRecord";

initDB();

export default async (req, res) => {
  const { id, amount, hash } = req.body;

  console.log(id, amount, hash)



  const getUserWallet = await User.findById(id)

  console.log(getUserWallet)



  const upperUser = getUserWallet.UpperLineSponserUser



  const findThisUser = await User.findOne({ WalletAddress: upperUser })


  if (findThisUser !== null) {



    /*
    ! CREATING SHORT RECORD FOR TOTAL EARNING
    */

    // const Find_Total_Earning_Short_Record = await MyTotalEarning.findOne({ RecordOwner: findThisUser._id })


    // if (!Find_Total_Earning_Short_Record) {


    //   await MyTotalEarning.create({
    //     RecordOwner: findThisUser._id,
    //     TotalEarning: Number(percan) * percen / 100
    //   })

    // } else {

    //   await MyTotalEarning.findByIdAndUpdate({ _id: findThisUser._id }, { $inc: { TotalEarning: Number(percan) * percen / 100 } })

    // }



    /*
    ! CREATING SHORT RECORD 
    */



    const GetShortRecord1 = await ShortRecord.findOne({ RecordOwner: findThisUser._id })


    if (GetShortRecord1 == null) {
      console.log("cames ====>")

      const createNewRecord = await ShortRecord({
        RecordOwner: findThisUser._id,
        AllMyDirectBusiness: Number(amount)
      }).save()

    } else {
      console.log("cames2d ====>")

      const getValueThen2 = await ShortRecord.findOne({ RecordOwner: findThisUser._id })

      let sumiTuPs = Number(getValueThen2.AllMyDirectBusiness) + Number(amount)


      console.log("the simeis =>>>>> " + sumiTuPs)

      const updateValue = await ShortRecord.findByIdAndUpdate({ _id: getValueThen2._id }, { AllMyDirectBusiness: sumiTuPs })

      console.log("gones also ====>")
    }










    /////////////////////////////////////////////////











  }







  var MyWallet = getUserWallet.Wallete

  console.log(amount)

  if (MyWallet == "null") {
    console.log("heres")
    MyWallet = 0
  }
  console.log(MyWallet)


  var Dates = new Date()

  var getDay = Dates.getDate()
  var getMonth = Dates.getMonth() + 1
  var getYear = Dates.getFullYear()

  var newWall = Number(MyWallet) + Number(amount)

  const updateWallet = await User.findByIdAndUpdate({ _id: id }, { Wallete: newWall })

  const DepositRecordss = DepositRecord({

    RecordOwner: id,
    OldWallet: MyWallet,
    DepositAmount: amount,
    Commision: "null",
    LykaToken: "null",
    TransactionHash: hash,
    Date: getYear + "-" + getMonth + "-" + getDay

  }).save()


















  res.json("updated wallet")
};