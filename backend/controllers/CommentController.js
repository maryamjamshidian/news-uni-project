import Comments from "../models/commentModel.js"

export const getAllComment = async(req, res)=>{
     try {
          const comments = await Comments.findAll({});
          res.json(comments)
     } catch (error) {
          console.log(error);
     }
}


export const createComment = async(req, res)=>{
     const {newsId, description, name, email, subject} = req.body;

     try {
         await Comments.create({
              newsId,
              description,
              name,
              email,
              subject
         })

         res.json("نظر شما ارسال شد و بعد از تایید مدیریت به نمایش در می آید")
     } catch (error) {
          res.json(error)
     }
}



export const updateComment = async(req, res)=> {
     const {name , subject, description} = req.body;

     try {
         await Comments.update({
              name,
              description,
              subject,
         },{
              where: {
                   id: req.params.id
              }
         })
         res.json("نظر با موفقیت ویرایش شد")
     } catch (error) {
          res.json(error)
     }
}


export const deleteComment = async(req,res)=> {
     try {
          await Comments.destroy({
               where: {
                    id: req.params.id
               }
          })
          res.json("نظر با موفقیت حذف شد")
     } catch (error) {
          res.json(error)
     }
}