import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import DepositRecord from "../../../helper/Modal/Records/DepositRecord";

initDB();

export default async (req, res) => {
  const { id } = req.body;




  const ITEMS_PER_PAGE = 5;

  const page = req.query.page || 1;


  console.log(req.query.page)

    // Put all your query params in here
const query = {};

const skip = (page - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

const countPromise = DepositRecord.estimatedDocumentCount(query);


  const findData = await DepositRecord.find({RecordOwner:id}).sort({_id:-1}).limit(ITEMS_PER_PAGE).skip(skip);


  const [count, items] = await Promise.all([countPromise, findData]);

  const pageCount = count / ITEMS_PER_PAGE; // 400 items / 20 = 20


  res.json({pagination: {
    count,
    pageCount,
  },findData})
};