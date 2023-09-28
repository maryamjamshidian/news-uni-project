import News from "../models/newsModel.js"
import path from "path";
import fs from "fs"
export const getNews = async(req,res) => {
     try {
          const news = await News.findAll({})
          res.json(news)
     } catch (error) {
          console.log(error)
     }
}


export const createNews = async(req,res)=>{
     if(req.files == null) return res.json({error: "عکسی انتخاب نکردید"})
     const title = req.body.title;
     const desc = req.body.desc;
     const catId = req.body.catId;
     const userId = req.body.userId;
     const file = req.files.file;
     const fileSize = file.data.length;
     const ext = path.extname(file.name);
     let dateNow = Math.round(Date.now());
     const fileName = dateNow + ext;
     const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
     const allowedType  = ['.png', ".jpg", ".jpeg"];

     if(!allowedType.includes(ext.toLowerCase())){
          return res.json({msg: " .png .jpeg .jpg *  عکس نامعتبر است از فرمت مجاز استفاده کنید "})
     }
     if(fileSize > 5000000) return res.json({msg: "حجم عکس نباید بیشتر از 5 مگابایت باشد"})

     file.mv(`./public/images/${fileName}`, async(err)=> {
          if(err) return res.json({msg: err.message})
          try {
               await News.create({
                    title: title,
                    desc: desc,
                    catId: catId,
                    userId: userId,
                    image: fileName,
                    url: url
               })
               res.json({msg: "خبر با موفقیت آپلود شد."})
          } catch (error) {
             console.log(error.message);  
          }
     })

}

export const getNewsById = async(req,res)=>{
     try {
          const response = await News.findOne({
               where: {
                    id: req.params.id
               }
          })
          res.json(response)
     } catch (error) {
          console.log(error);
     }
}
