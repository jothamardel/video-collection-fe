import { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useHistory, Redirect } from "react-router-dom"

import { loginUser } from '../../../redux/User/user.actions'; 
import Routes from '../../../utils/Routes';  

const LoginArea = (props) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()

    const { loginUser, user: { loading, user } } = props;
   

    // Login
    const login = e => {
        e.preventDefault()
       
        loginUser({
            id, password
        }, history)
    }

    if (user._id) {
        return <Redirect to={Routes.home}/>
    }

    

    return (
        <>
            <section id="login_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="account_form">
                                <h3>Login</h3>
                                <form onSubmit={login}>
                                    <div className="default-form-box">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" onChange={e => setId(e.currentTarget.value)} required placeholder="john@gmail.com"/>
                                    </div>
                                    <div className="default-form-box">
                                        <label>Password<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" onChange={e => setPassword(e.currentTarget.value)} required placeholder="password"/>
                                    </div>
                                    <div className="login_submit">
                                        {
                                            loading ?
                                            <button className="theme-btn-one btn-black-overlay btn_md" disabled style={{ cursor: 'not-allowed'}}>loading...</button> :
                                            <button className="theme-btn-one btn-black-overlay btn_md" type="submit">login</button>
                                        }
                                    </div>
                                    {/* <div className="remember_area">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="materialUnchecked"/>
                                            <label className="form-check-label" htmlFor="materialUnchecked">Remember me</label>
                                        </div>
                                    </div> */}
                                    {/* <Link to={Routes.register} className="active" style={{textAlign: 'center'}}>Create Your Account?</Link> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    loginUser: (data, history) => dispatch(loginUser(data, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginArea);
