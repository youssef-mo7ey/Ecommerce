
import SignIn from './SignIn/SignIn'
import Register from './Register/Register'
import { useState } from 'react';

const Signing = () => {
  const [signUp,setSignUp]=useState(1);
return (
  <div>    
    {signUp===1 && <SignIn setSignUp={setSignUp}/>}
    {signUp===2 && <Register setSignUp={setSignUp}/>}
  </div>
)}

export default Signing  