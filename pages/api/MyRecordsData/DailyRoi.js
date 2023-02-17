import initDB from "../../../helper/initDB";
import DailyRoi from "../../../helper/Modal/DailyRoi";

initDB();

export default async (req, res) => {
  const { id } = req.body;


  console.log(id)


  const findMyPackage = await DailyRoi.find({RoiOwner:id})



  console.log(findMyPackage)


  res.json(findMyPackage)
};

