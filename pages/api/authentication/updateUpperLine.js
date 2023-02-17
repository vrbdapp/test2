import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import DailyRoi from "../../../helper/Modal/DailyRoi"
import LevelDailyRoi from "../../../helper/Modal/LevelDailyRoi"
import PackageIHistory from "../../../helper/Modal/PackageIHistory"
import MyUpperline from "../../../helper/Modal/Levels/MyUpperline"
import ShortRecord from "../../../helper/Modal/ShortRecord";


initDB();

export default async (req, res) => {
  const { wallAddress, upperline } = req.body;


  // console.log(upperline)


  // if (!wallAddress) {
  //   return res
  //     .status(500)
  //     .json({ error: "You Have Not Provided All The Informations" });
  // }



  if (wallAddress == upperline) {
    return res
      .status(500)
      .json({ error: "Both Wallet Address And Upperline Sponser Is Same" });
  }


  const findThatUser = await User.findOne({WalletAddress:upperline})



  var findUser = await User.findOne({ WalletAddress: wallAddress })



  if(!upperline){




    var updateItNow = await User.findByIdAndUpdate({ _id: findUser._id }, { UpperLineSponserUser: "0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x" })




    const update = MyUpperline({
  
      MyUserid:findUser._id,
      MyUpperLines:`["0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x"]`
    
    }).save()



  return res.json({datam:updateItNow,goToAddWallet:true})



  }else if(!findThatUser){

    return res.status(502).json({message:"You Have Not Entered Right Sponser Code"})




  }else{




    
    // console.log("refer code is right")




      // Here i have witten logic for infinite levels

  const findGotReferId = await User.findOne({ WalletAddress: wallAddress })


  console.log(findGotReferId)



  var updateItNow = await User.findByIdAndUpdate({ _id: findUser._id }, { UpperLineSponserUser: upperline })

  /////////////////////////////////////////////////////////////////





  const GetShortRecord1 = await ShortRecord.findOne({RecordOwner: findThatUser._id})


          
          
  if (GetShortRecord1 == null) {
    // console.log("cames ====>")
    
    const createNewRecord = await ShortRecord({
      RecordOwner:findThatUser._id,
      AllMyDirectPeople:1
    }).save()
    
  }else{
    // console.log("cames2d ====>")


    console.log("came here to add what")
    
    const getValueThen2 = await ShortRecord.findOne({RecordOwner: findThatUser._id})


    // console.log(getValueThen2)

    let sumiTuPs = Number(getValueThen2.AllMyDirectPeople) + 1


    // console.log("the simeis =>>>>> "+sumiTuPs)

    const updateValue = await ShortRecord.findByIdAndUpdate({_id:getValueThen2._id},{AllMyDirectPeople:sumiTuPs})
    
    // console.log("gones also ====>")
  }










  //////////////////////////////////////////////////////////////////


  if (findGotReferId) {


    // console.log("came in box")

    var UpperlinesList = [];

    var thatUser = await User.findOne({WalletAddress:findGotReferId.WalletAddress})

    while (thatUser !== "null" && thatUser !== null) {
      
      thatUser = await User.findOne({UpperLineSponserUser:thatUser.UpperLineSponserUser})

      if (thatUser !== null) {
        // console.log("first")
   
        UpperlinesList.push(`"${thatUser.UpperLineSponserUser}"`)
        thatUser = await User.findOne({WalletAddress:thatUser.UpperLineSponserUser})
      }else{
        // console.log("sec")
        thatUser = null
        break;
      }

    }

  }




  
const update = MyUpperline({

  MyUserid:findUser._id,
  MyUpperLines:`[${UpperlinesList}]`

}).save()












  }





  // if (!findThatUser) {




    
  //   var updateItNow = await User.findByIdAndUpdate({ _id: findUser._id }, { UpperLineSponserUser: "0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x" })




  //   const update = MyUpperline({
  
  //     MyUserid:findUser._id,
  //     MyUpperLines:`["0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x"]`
    
  //   }).save()





  //   console.log("first")

  // }else{


     
  
    





  // }















res.json({datam:updateItNow,goToAddWallet:false})

}

