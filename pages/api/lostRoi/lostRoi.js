import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import LapRoi from "../../../helper/Modal/LapRoi";

initDB();

export default async (req, res) => {
  const { id } = req.body;

  const findData = await LapRoi.find({RoiOwner:id})

  res.json(findData)
};

