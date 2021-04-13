import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const Login = ({ user, setUser }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = auth.signInWithEmailAndPassword(email, password);
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult()
      setUser({ email: user.email, token: idTokenResult.token })
    } catch (error) {
      toast.error(error.message);
    }
  }

  const loginForm = () => (<form onSubmit={handleSubmit}>
    <input type="email" className="form-control" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
    <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <button type="submit" className="btn btn-raised mt-3">
      Register
    </button>
  </form>)

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          {loginForm()}
        </div>
      </div>
    </div>
  )
}

export default Login

