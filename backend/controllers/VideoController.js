import path from "path"
import Video from "../models/videoModel.js";

export const createVideo = async(req,res)=>{
    
         if(req.files == null) return res.json({nsg: "ویدیو انتخاب نکردید"}) 
         const file = req.files.file;
         const fileSize = file.data.length;
         const ext = path.extname(file.name);
         let dateNow = Math.round(Date.now());
         const fileName = dateNow + ext;
         const url = `${req.protocol}://${req.get("host")}/videos/${fileName}`;
         const allowedType  = ['.mp4'];

         if(!allowedType.includes(ext.toLowerCase())){
              return res.json({msg: " .mp4 *  ویدیو نامعتبر است از فرمت مجاز استفاده کنید "})
         }
         if(fileSize > 5000000) return res.json({msg: "حجم ویدیو نباید بیشتر از 5 مگابایت باشد"})
         file.mv(`./public/videos/${fileName}`, async(err)=>{
               if(err) return res.json({msg: err.message})
               try {
                    await Video.create({video: fileName, url: url})
                    res.json({msg:"ویدیو افزوده شد"})
               } catch (error) {
                    console.log(err.message);
               }
         })
}