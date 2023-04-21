import initDB from "../../../helper/initDB"
import ShortRecord from "../../../helper/Modal/ShortRecords/Withdrawal"

initDB()

export default async(req,res)=>{

    const {id} = req.body;

    const Find_Data = await ShortRecord.findOne({RecordOwner:id}).lean()

    const AllTimeLevelBusiness = Find_Data.AllTimeLevelBusiness
    const AllTimeDailyBusiness = Find_Data.AllTimeDailyBusiness
    const AllTimeCareerReward = Find_Data.AllTimeCareerReward
    

    res.json("")
}