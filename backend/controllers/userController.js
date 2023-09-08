import Users from "../models/userModel.js";
import bcrypt from "bcrypt"
export const getAllUsers = async (req, res) => {
  try {
    const users = Users.findAll({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword, isAdmin } = req.body;
  if(password!==confPassword){
    return res.json("پسورد و تکرار آن باهم برابر نیست")
  }
  const salt= await bcrypt.genSalt();
  const hashPassword= await bcrypt.hash(password,salt);

  try {
await Users.create({
  name:name,
  email:email,
  password:hashPassword,
  isAdmin:isAdmin
})
res.json("ثبت نام موفقیت آمیر بود")
    // console.log(name, email, password, confPassword, isAdmin);
    // res.json("register");
  } catch (error) {
    console.log(error);
  }
};
