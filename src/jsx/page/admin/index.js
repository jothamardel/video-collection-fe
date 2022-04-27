import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import axios from 'axios';
import Swal from "sweetalert2";
import Loader from '../../component/Common/loader/index';

import { loadAdmin, registerUser } from '../../../redux/User/user.actions';
import Routes from '../../../utils/Routes';

const AdminLogin = (props) => {
    const history = useHistory()
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [status, setStatus] = useState();

    let { loadAdmin, user: { loading, user } } = props;

   function adminLogin(e) {
		 e.preventDefault();
		 if (password.toLowerCase() === 'admin_skillseed') {
			 const data = {
				 ...user,
				 isAdmin: true
			 }
			 Swal.fire({
				title: 'Success!',
				text: 'Redirecting...',
				icon: 'success',
				showConfirmButton: false,
				timer: 1000
			})
			 loadAdmin(data);
			 history.push(Routes.shop);
			 return;
		 }

		 Swal.fire({
				title: 'Failed!',
				// text: "una",
				icon: 'failed',
				showConfirmButton: true,
			})

		 setError({ message: "Unable to login"})
	 }

    return (
        <>
            {
                loading ? <Loader /> :
                <section id="login_area" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                                <div className="account_form">
                                    <h3>Admin Login</h3>
                                    {error.empty && <p className='text-danger'>{error.empty}</p>}
                                    {error.message && <p className='text-danger' style={{ textAlign: 'center'}}>{error.message}</p>}
                                    <form onSubmit={adminLogin}>
                                        <div className="default-form-box">
                                            <label>Passwords<span className="text-danger">*</span></label>
                                            {error.mismatch && <p className='text-danger' style={{fontSize: '0.6rem'}}>{error.mismatch}</p>}
                                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.currentTarget.value)} required />
                                        </div>
                                        <div className="login_submit">
                                            {
                                                loading ?
                                                <button className="theme-btn-one btn-black-overlay btn_md" disabled >Loading...</button> :
                                                <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Login</button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

const mapStateProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    registerUser: (data, history) => dispatch(registerUser(data, history)),
		loadAdmin: data => dispatch(loadAdmin(data))
});

export default connect(mapStateProps, mapDispatchToProps)(AdminLogin);
