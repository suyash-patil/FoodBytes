import React, { useState } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';

const Login = ({ history, user, setUser }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult()
      setUser({ email: user.email, token: idTokenResult.token })
      history.push("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  const googleLogin = async () => {
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      setUser({ email: user.email, token: idTokenResult.token })
      history.push("/");
    }).catch((err) => {
      console.log(err)
      toast.error(err.message)
    })
  }

  const loginForm = () => (<form onSubmit={handleSubmit}>
    <div className="form-group">
      <input type="email" className="form-control" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
    </div>
    <div className="form-group">
      <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <Button onClick={handleSubmit}
      type="primary"
      className="mb-3"
      block
      shape="round"
      size="large"
      disabled={!email || password.length < 6}
      icon={<MailOutlined />}
    >
      Login with Email/Password
    </Button>
  </form>)

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <h4>Loading...</h4> : <h4>Login</h4>}
          {loginForm()}
          <Button onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            size="large"
            icon={<GoogleOutlined />}
          >
            Login with Email/Password
    </Button>
        </div>
      </div>
    </div>
  )
}

export default Login

