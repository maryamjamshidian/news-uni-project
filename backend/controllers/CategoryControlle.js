import Category from "../models/categoryModel.js";

export const getCategory = async(req,res)=> {
     try {
          const categories = await Category.findAll({});
          res.json(categories)
     } catch (error) {
          console.log(error);
     }
}

export const createCategory = async(req,res) => {
     try {
          res.json("create category")
     } catch (error) {
          console.log(object);
     }
}