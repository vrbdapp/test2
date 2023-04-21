import { FormatListNumberedRtlOutlined } from "@mui/icons-material";
import initDB from "../../../helper/initDB"
import Withdrawal from "../../../helper/Modal/ShortRecords/Withdrawal"
import ShortRecord from "../../../helper/Modal/ShortRecord"

initDB()

const dailyReward = async (req, res) => {

  if (req.method !== "POST") {
    return res.json("Please Make POST Request")
  }

  const { id } = req.body;

  const Find_Withdrawal_ShortRecord = await Withdrawal.findOne({ RecordOwner: id })

  /*
  ! CALCULATING TOTAL EARNINGS
  */

  var Total_Earnings_Yet = 0

  await ShortRecord.aggregate([
    {
      $addFields: {
        total: { $sum: ["$AllTimeLevelBusiness", "$AllTimeDailyBusiness", "$AllTimeCareerReward"] }
      }
    }
  ])
    .then((results) => {
      results.forEach(function (doc) {
        Total_Earnings_Yet = Total_Earnings_Yet + doc.total
      });
    })
    .catch((err) => {
      console.log(err)
    });



    console.log(Total_Earnings_Yet)

  /*
  ! // CALCULATING TOTAL EARNINGS DONE
  */

  let My_Total_Withdrawal_Yet = Find_Withdrawal_ShortRecord ? Find_Withdrawal_ShortRecord.WithdrawAmount : 0

  var Eligibal_For_Withdrawal = Total_Earnings_Yet - My_Total_Withdrawal_Yet

  if (Eligibal_For_Withdrawal < 0) {
    Eligibal_For_Withdrawal = 0
  }

  res.json({ firstData: Eligibal_For_Withdrawal, totalwithdraw: My_Total_Withdrawal_Yet })

};

export default dailyReward;