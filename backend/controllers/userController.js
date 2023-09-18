import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users =  await Users.findAll({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword, isAdmin } = req.body;
  if (password !== confPassword) {
    return res.json("پسورد و تکرار آن باهم برابر نیست");
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const found = await Users.findOne({ where: { email: email } });
    if (found) {
      return res.json("ایمیل قبلا ثبت شده");
    }
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      isAdmin: isAdmin,
    });
    res.json("ثبت نام موفقیت آمیر بود");
    // console.log(name, email, password, confPassword, isAdmin);
    // res.json("register");
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    // res.json(user);
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.json({ error: "پسورد اشتباه است" });
    }


    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const isAdmin = user[0].isAdmin;
    const accessToken = jwt.sign(
      { userId, name, email, isAdmin },
      process.env.ACCESS_TOKEN_SECRET,{
           expiresIn: "45s"
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email, isAdmin },
      process.env.REFRESH_TOKEN_SECRET,{
           expiresIn : "1d"
      }
     )
     await Users.update({refresh_token: refreshToken},{
      where: {
           id: userId,
      }
 })

 res.cookie("refreshToken", refreshToken,{
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000
})
    res.json({ 
      userId,
       name,
        email,
         isAdmin,
         accessToken,

          msg: "شما با موفقیت وارد شدید" });
  } catch (error) {
    res.json({ error: " کاربر وجود ندارد" });
  }
};
export const Logout = async(req,res)=> {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.json("توکن پیدا نشد")
    const user = await Users.findOne({refresh_token: refreshToken});
    if(!user) return res.json("کاربر پیدا نشد")
    const clr = null;
    await Users.update({
      refresh_token: clr
    }, {
      where: {
        id: user.id
      }
    })
    res.clearCookie("refreshToken")
    res.json("خروج موفقیت آمیز بود")
  } catch (error) {
    console.log(error);
  }
}


export const deleteUser = async(req, res)=>{
  const user = await Users.findOne({
    where: {
      id: req.params.id
    }
  })
  if(!user) return res.json({message: "این کاربر پیدا نشد"})
  try {
    await Users.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({message: "کاربر با موفقیت حذف شد"})
  } catch (error) {
    console.log(error);
  }
}



export const updateUser = async (req,res) =>{
  const {name, email, password, confPassword, isAdmin} = req.body;
  if(password !== confPassword){
    return res.json({error: "پسوورد و تکرار آن با هم برابر نیستند"})
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt)
  try {
    
    await Users.update({
      name: name,
      email: email,
      password: hashPassword,
      isAdmin: isAdmin
    },{
      where: {
        id: req.body.id
      }
    })


    res.json({message: "ویرایش موفقیت آمیز بود"})

  } catch (error) {
    console.log(error);
  }
}

export const updateProfile = async(req,res)=>{
  const avatar = await Users.findOne({
    where: {
      id: req.params.id
    }
  })

  if(!avatar) return res.status(404).json({msg: "کاربری پیدا نشد"})
  
  let fileName = "";
  if(req.files === null){
    fileName = avatar.image
  }else{
    
  }
} 