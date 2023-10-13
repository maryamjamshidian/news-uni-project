import React, { useContext } from "react";
import TopMenu from "../components/Home/TopMenu/TopMenu";
import Navbar from "../components/Home/Navbar/Navbar";
import contact from "../assets/images/contact.webp";
import * as Yup from "yup";
import { useFormik } from "formik";
import { HomeContext } from "../context/context";

const formSchema = Yup.object({
  email: Yup.string().required("وارد کردن ایمیل الزامی است"),
  subject: Yup.string().required("وارد کردن موضوع الزامی است"),
  message: Yup.string().required("وارد کردن متن الزامی است"),
});

const Contact = () => {

     const {handleEmail} = useContext(HomeContext)

  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "",
      message: "",
    },
    onSubmit: (values) => {
     handleEmail(values);
    },
    validationSchema: formSchema,
  });

  return (
    <>
      <TopMenu />
      <Navbar />
      <div className="contact pt-6">
        <div className="container">
          <div className="columns">
            <div className="column">
              <img src={contact} alt="" />
            </div>
            <div className="column">
              <h1 className="title mb-6">ارتباط با ما</h1>
              <div className="phone-number mb-6 is-size-5">
                <span>تلفن تماس :</span> <span>071234556</span>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="field">
                  <input
                    type="text"
                    className="input"
                    placeholder="ایمیل"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <p className="help has-text-danger">
                    {formik.touched.email && formik.errors.email}
                  </p>
                </div>
                <div className="field">
                  <input
                    type="text"
                    className="input"
                    placeholder="موضوع"
                    value={formik.values.subject}
                    onChange={formik.handleChange("subject")}
                    onBlur={formik.handleBlur("subject")}
                  />
                  <p className="help has-text-danger">
                    {formik.touched.subject && formik.errors.subject}
                  </p>
                </div>
                <div className="field">
                  <textarea
                    className="textarea"
                    placeholder="متن"
                    value={formik.values.message}
                    onChange={formik.handleChange("message")}
                    onBlur={formik.handleBlur("message")}
                  ></textarea>

                  <p className="help has-text-danger">
                    {formik.touched.message && formik.errors.message}
                  </p>
                </div>
                <div className="field">
                  <button type="submit" className="button is-success px-6">
                    ارسال
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
