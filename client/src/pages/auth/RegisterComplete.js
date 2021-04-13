import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const RegisterComplete = ({ history }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Email and Password required");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be 6 character long")
        return;
      }
      const result = await auth.signInWithEmailLink(email, window.location.href);
      // If user is already verified
      if (result.user.emailVerified) {
        // Remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');
        // setting up the password
        let user = auth.currentUser;
        await user.updatePassword(password);

        const idToken = await user.getIdTokenResult();
        // redirect to home page
        // history.push('/');
      }
    } catch (error) {
      console.log("Registration failed!");
      toast.error(error.message);
    }

  }

  const completeRegisterForm = () => (<form onSubmit={handleSubmit}>
    <input type="email" className="form-control" value={email} disabled />
    <input type="password" className="form-control" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} autoFocus />
    <button type="submit" className="btn btn-raised mt-3">
      Register
    </button>
  </form>)

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registration</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  )
}

export default RegisterComplete
