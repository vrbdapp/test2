import User from "../../helper/Modal/User"


export default async (req, res) => {


    const FindAllUsers = await User.find()



   res.json(FindAllUsers)

}