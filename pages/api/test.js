import User from "../../helper/Modal/User";
import initDB from "../../helper/initDB";



initDB()
export default async (req, res) => {

    const findData = await User.find({ $slice: 2})


    res.json(findData)

    
    

}