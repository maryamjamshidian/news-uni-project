import React from 'react'
import Dashboard from '../../Dashboard'
import * as Yup from "yup";
import {useFormik} from "formik";

const formSchema = Yup.object({
     title: Yup.string().required("عنوان خبر الزامی است"),
     desc: Yup.string().required("متن خبر الزامی است"),
     catId: Yup.string().required("انتخاب دسته بندی الزامی است"),
})


const AddNews = () => {

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      catId: "",
      file: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: formSchema
  })


  return (
    <Dashboard>
     <form onSubmit={formik.handleSubmit}>
       <div className="field">
         <label className="label">عنوان خبر</label>
         <div className="control">
           <input type="text" className="input"
            placeholder='مثال * این عنوان است'
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
           />
         </div>
       </div>
       <div className="field">
         <label className="label">متن خبر</label>
         <div className="control">
           <textarea className='textarea'
            placeholder='مثال * این متن است'
             value={formik.values.desc}
            onChange={formik.handleChange("desc")}
            onBlur={formik.handleBlur("desc")}
           ></textarea>
         </div>
       </div>

       <div className="field">
         <label className="label">دسته بندی خبر </label>
         <div className="control">
            <div className="select is-fullwidth">
              <select
               value={formik.values.catId}
               onChange={formik.handleChange("catId")}
                onBlur={formik.handleBlur("catId")}
              >
                <option>تست</option>
              </select>
            </div>
         </div>
       </div>
       <div className="field">
         <label className="label">عکس خبر</label>
         <div className="control">
            <input type="file" className="input" />
         </div>
       </div>

       <div className="field mt-6">
         <div className="control">
           <button type='submit' className='button is-success px-6'>ذخیره</button>
         </div>
       </div>
     </form>
    </Dashboard>
  )
}

export default AddNews