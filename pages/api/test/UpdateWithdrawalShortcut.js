import initDB from "../../../helper/initDB";
import Withdrawal from "../../../helper/Modal/ShortRecords/Withdrawal";
import WithdrawRecord from "../../../helper/Modal/Records/WithdrawRecord";

initDB()

export default async (req, res) => {

  const Find_All_Withdrawals = await WithdrawRecord.find().select("RecordOwner WithdrawAmount")
  
  await Promise.all(Find_All_Withdrawals.map(async (element) => {
    await Withdrawal.findOneAndUpdate(
      { RecordOwner: element.RecordOwner },
      { $inc: { WithdrawAmount: Number(element.WithdrawAmount) } },
      { upsert: true }
    );
  }));

  res.json("done")
}
