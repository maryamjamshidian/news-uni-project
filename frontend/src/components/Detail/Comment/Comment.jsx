import React from 'react'
import ViewComment from './ViewComment'

const Comment = () => {
  return (
  <>
      <div className="comment-section mt-6 mb-6">
         <form>
         <div className="field">
              <textarea className='textarea' placeholder='نظر شما'></textarea>
         </div>
         <div className="columns">
              <div className="column">
                   <input type="text" className="input" placeholder='نام شما' />
              </div>
              <div className="column">
                   <input type="text" className="input" placeholder='ایمیل' />
              </div>
         </div>
         <div className="field">
              <input type="text" className="input" placeholder='موضوع' />
         </div>
         <div className="field">
             <button className="button has-background-danger is-fullwidth mt-5 has-text-white">ارسال نظر</button>
         </div>
    </form>
   </div>

   <ViewComment />
  </>
  )
}

export default Comment