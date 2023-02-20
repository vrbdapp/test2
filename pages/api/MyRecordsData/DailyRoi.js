import initDB from "../../../helper/initDB";
import DailyRoi from "../../../helper/Modal/DailyRoi";

initDB();

export default async (req, res) => {
  const { id } = req.body;



  const ITEMS_PER_PAGE = 25;

  const page = req.query.page || 1;


  console.log(req.query.page)

    // Put all your query params in here
const query = {};

const skip = (page - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

const countPromise = DailyRoi.estimatedDocumentCount(query);



  const findMyPackage = await DailyRoi.find({RoiOwner:id}).sort({_id:-1}).limit(ITEMS_PER_PAGE).skip(skip);



  const [count, items] = await Promise.all([countPromise, findMyPackage]);

  const pageCount = count / ITEMS_PER_PAGE; // 400 items / 20 = 20


  res.json({pagination: {
    count,
    pageCount,
  },findMyPackage})
};

