import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import DirectSponserIncome from "../../../helper/Modal/DirectSponserIncome";
import PackageIHistory from "../../../helper/Modal/PackageIHistory";
import DailyRoi from "../../../helper/Modal/DailyRoi";
import LevelDailyRoi from "../../../helper/Modal/LevelDailyRoi";
import DepositRecord from "../../../helper/Modal/Records/DepositRecord"
import WithdrawRecord from "../../../helper/Modal/Records/WithdrawRecord"
import TeamRecord from "../../../helper/Modal/TeamRecord"
import CareerReward from "../../../helper/Modal/Records/CareerReward"
import LapRoi from "../../../helper/Modal/LapRoi"
import ShortRecord from "../../../helper/Modal/ShortRecord";


initDB();

export default async (req, res) => {
  const { id } = req.body;

  var arr = 0 // <==================< total deposited


  const me = await User.findById(id)

  const FindPack = await DepositRecord.find({ RecordOwner: id })

  FindPack.map((hit) => {


    return arr = arr + Number(hit.DepositAmount)
  })


  // console.log("deposit calculation done")

  // // Going to calculate total staking

  // var brr = 0

  // const findMyDailyRoi = await DailyRoi.find({ RoiOwner: id })

  // findMyDailyRoi.map((hit) => {
  //   return brr = brr + Number(hit.GiveRoiCoin)
  // })

  // console.log("findMyDailyRoi calculation done")


  
  var findDatasForLevel5 = await ShortRecord.findOne({RecordOwner:id})



  var brr = findDatasForLevel5 ? findDatasForLevel5.AllTimeDailyBusiness : 0
  
  

  // Going to calculate total roi levels



  // console.log("This is taking time")

  // var crr = 0

  // const findMyTeamRoiLevel = await LevelDailyRoi.find({ ROIOwner: id })


  // console.log(findMyTeamRoiLevel.length)

  // findMyTeamRoiLevel.map((hit) => {
  //   return crr = crr + Number(hit.coinEarned)
  // })
  
  // console.log("findMyTeamRoiLevel calculation done")



  var findDatasForLevel = await ShortRecord.findOne({RecordOwner:id})



  var crr = findDatasForLevel ? findDatasForLevel.AllTimeLevelBusiness : 0



  // Going to Calculate total direct number


  // const findDirects = await User.find({ UpperLineSponserUser: me.WalletAddress })


  
  var findDatasForLevel3 = await ShortRecord.findOne({RecordOwner:id})



  var findDirects = findDatasForLevel3 ? findDatasForLevel3.AllMyDirectPeople : 0





  // Going to calculate total withdrawal 

  const findWithdrawal = await WithdrawRecord.find({ RecordOwner: id })

  var err = 0

  findWithdrawal.map((hit) => {
    return err = err + Number(hit.WithdrawAmount)
  })

  console.log("findWithdrawal calculation done")



  // going to calculate team cals




  const findTeamCals = await TeamRecord.findOne({ user: id })

  let totalMembers = findTeamCals ? findTeamCals.totalMembers : 0
  let totalBussiness = findTeamCals ? findTeamCals.totalBussiness : 0



  // going to fetch career reward

  const fetchCareerReward = await CareerReward.find({ user_id: id })

  var xrr = 0

  fetchCareerReward.map((hit) => {

    if (hit.reward_level == "InEligible") {
      return
    }
    if (hit.reward_level == "Ineligible") {
      return
    }
    if (hit.reward_level == "Pro") {
      return
    }
    if (hit.reward_level == "Starter") {
      return
    }

    return xrr = xrr + Number(hit.reward_granted.replace("$",""))
  })


  console.log("fetchCareerReward calculation done")



 
  // going to calculate total direct business

  // const findMyWalletAddress = await User.findById(id)

  // var srre = 0

  // const findtotaldirectbusiness = await User.find({ UpperLineSponserUser: findMyWalletAddress.WalletAddress })

  // for (let index = 0; index < findtotaldirectbusiness.length; index++) {

  //   const element = findtotaldirectbusiness[index];

  //   var FindMyDeposits = await DepositRecord.find({ RecordOwner: element._id })

  //   FindMyDeposits.map((hit) => {
  //     return srre = srre + Number(hit.DepositAmount)
  //   })

  // }



  var findDatasForLevel2 = await ShortRecord.findOne({RecordOwner:id})



  var srre = findDatasForLevel2 ? findDatasForLevel2.AllMyDirectBusiness : 0










  console.log("findtotaldirectbusiness calculation done")








  // get career reward 



  const getCareerReard  = await CareerReward.find({user_id:id})
 
  var krr = 0

  getCareerReard.map((hit)=>{


    // console.log(hit)


    if (hit.reward_level == "InEligible") {
      return
    }
    if (hit.reward_level == "Ineligible") {
      return
    }
    if (hit.reward_level == "Pro") {
      return
    }
    if (hit.reward_level == "Starter") {
      return
    }



    return krr = krr + Number(hit.reward_granted.replace("$",""))
  })


  console.log("getCareerReard calculation done")




  // calculate lap wallet 

    var lpp = 0

  const MyLapRoi = await LapRoi.find({RoiOwner:id})

  MyLapRoi.map((hit)=>{
    return lpp = lpp + Number(hit.GiveRoiCoin)
  })


  console.log("MyLapRoi calculation done")
  
  


  
  // Get Creer Reward Rank Eligi

  
  
  const somesome = await CareerReward.findOne({user_id:id}).sort({_id:-1})
  
  let parseIt
  if (somesome) {
    
    parseIt = somesome.reward_level
  }
  
  console.log("somesome calculation done")






  


  res.json({
    "Total_Staking": brr,
    "Team_Roi_Level": crr,
    "Craeer_Reward": xrr,
    "Team_Number": totalMembers,
    "Team_Busines": totalBussiness,
    "Total_Deposit": arr,
    "Total_Earned_Income": Number(brr) + Number(crr) + Number(krr),
    "Total_Direcct_Business": srre,
    "Totan_Direct_Number": findDirects,
    "Total_Withdrawal": err,
    "Lap_Wallet":lpp,
    "Rank_Eigible":parseIt ? parseIt : "Ineligible",
    "Real_Availible":Number(brr) + Number(crr) + Number(krr) - Number(err)
  })
};


