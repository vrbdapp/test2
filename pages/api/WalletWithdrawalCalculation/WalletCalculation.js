import { FormatListNumberedRtlOutlined } from "@mui/icons-material";
import initDB from "../../../helper/initDB"
import DailyRoi from "../../../helper/Modal/DailyRoi";
import LevelDailyRoi from "../../../helper/Modal/LevelDailyRoi";
import DepositRecord from "../../../helper/Modal/Records/DepositRecord"
import WithdrawRecord from "../../../helper/Modal/Records/WithdrawRecord"
import ShortRecord from "../../../helper/Modal/ShortRecord"

initDB()

const dailyReward = async (req, res) => {

    
    if (req.method !== "POST") {
        return res.json("Please Make POST Request")
    }

    const {id} = req.body;

    console.log(id)


    const findRecords = await ShortRecord.findOne({RecordOwner:id})



    console.log(findRecords)


    let TotalDailyReward = findRecords ? findRecords.AllTimeDailyBusiness : 0
    let TotalLevelReward = findRecords ? findRecords.AllTimeLevelBusiness : 0
    let TotalCareerRewadr = findRecords ? findRecords.AllTimeCareerReward : 0
    let TotalEarning = TotalDailyReward + TotalLevelReward + TotalCareerRewadr // Avalible Token


    let FindMyWithdrawals = await WithdrawRecord.find({RecordOwner:id})

    let TotalWithdraw = 0 // Total Withdraw

    for (let index = 0; index < FindMyWithdrawals.length; index++) {
      const element = FindMyWithdrawals[index];
      
      TotalWithdraw = TotalWithdraw + Number(element.WithdrawAmount)
      
    }

    let getFirstCal = TotalEarning > TotalWithdraw ?   TotalEarning - TotalWithdraw : TotalWithdraw - TotalEarning


    console.log("this is avalible balance ===> "+TotalEarning)
    console.log("this is till yet withdraw ===> "+TotalWithdraw)


    console.log("this is get first cal  ===> "+getFirstCal)


    res.json({firstData:getFirstCal,totalwithdraw:TotalWithdraw})
};

export default dailyReward;