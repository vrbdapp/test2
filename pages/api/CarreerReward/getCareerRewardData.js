import initDB from "../../../helper/initDB";
import CareerReward from "../../../helper/Modal/Records/CareerReward"

initDB();

export default async (req, res) => {
  const { id } = req.body;

  const findDatas = await CareerReward.find({user_id:id})


  res.json(findDatas)
};


