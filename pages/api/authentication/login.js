import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import DailyRoi from "../../../helper/Modal/DailyRoi"
import LapRoi from "../../../helper/Modal/LapRoi"
import LevelDailyRoi from "../../../helper/Modal/LevelDailyRoi"
import PackageIHistory from "../../../helper/Modal/PackageIHistory"
import DepositRecord from "../../../helper/Modal/Records/DepositRecord"
import MyUpperline from "../../../helper/Modal/Levels/MyUpperline"

// most recent imports
import CareerReward from '../../../helper/Modal/Records/CareerReward';
import { parse, differenceInHours, subDays, format } from 'date-fns';
import { calculateRewards } from '../../../helper/calculate-reward';
import { getDailyRewardLevel } from '../../../helper/get-daily-reward-level';

initDB();

export default async (req, res) => {
  const { wallAddress, upperline } = req.body;



  if (!wallAddress) {
    return res
      .status(404)
      .json({ error: "You Have Not Provided All The Informations" });
  }

  const usese = await User.findOne({ WalletAddress: wallAddress })


  if (usese) {
    
    return res.json({datam:usese,goToAddWallet:false})
  }else{
    
    
    const createNewUser = await User({
      UpperLineSponserUser:upperline,
      WalletAddress:wallAddress
      
    }).save()
    
    
    
    return res.json({datam:createNewUser,goToAddWallet:true})





  }












};