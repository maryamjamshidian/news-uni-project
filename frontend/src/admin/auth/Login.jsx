import React from 'react'
import "./auth.css"
const Login = () => {
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
         <div className="background-overlay"></div>
         <div className="hero-body">
              <div className="container">
                   <div className="columns is-centered">
                        <div className="column is-4">
                             <form className="box">
                                  <h1 className='title has-tex-centered mb-5'>
                                       ورود به پنل مدیریت
                                  </h1>
                                  <div className="field">
                                       <label className="label">ایمیل</label>
                                       <div className="control">
                                            <input type="text"
                                             className="input"
                                             placeholder='مثال * Example@gmail.com'
                                             />
                                       </div>
                                  </div>
                                  <div className="field">
                                       <label className="label">پسورد</label>
                                       <div className="control">
                                            <input type="password"
                                             className="input"
                                             placeholder='رمز عبور'
                                             />
                                       </div>
                                  </div>
                                  <div className="field mt-5">
                                        <button type='submit' className='button is-success is-fullwidth'>
                                             ورود
                                        </button>
                                  </div>
                             </form>
                        </div>
                   </div>
              </div>
         </div>
    </section>
  )
}

export default Login