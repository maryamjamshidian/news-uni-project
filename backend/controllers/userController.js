import Users from "../models/userModel.js";

export const getAllUsers=async(req,res)=>{

try {
    const users=Users.findAll({});
    res.json(users)

} catch (error) {
    console.log(error);
}

}