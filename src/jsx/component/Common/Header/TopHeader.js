import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import avater from '../../../assets/img/common/avater.png'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2';

import { loadAdmin, logoutUser } from '../../../../redux/User/user.actions';
import Routes from '../../../../utils/Routes';

const TopHeader = (props) => {
    let dispatch = useDispatch();
    const history = useHistory()

    const { status, user: { user }, loadAdmin } =  props;

    const logout = () => {
        Swal.fire({
            icon: 'success',
            title: 'Logout Sucessfull',
            text: 'Thank You'
        })
        dispatch({ type: "user/logout" })
        history.push("/login");
    }



    return (
        <>
            <section id="top_header">
                <div className="container">
                    <div className="row" style={{alignItems: 'center'}}>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_left" style={{ padding: '1rem'}}>
                                <p><Link to="/" onClick={() => {
                                    loadAdmin({...user, isAdmin: false})
                                }}>Video Collection</Link></p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_right">
                                {
                                    !user._id ?
                                    <ul className="right_list_fix">
                                            
                                            <li><Link to="/login"><i className="fa fa-user"></i> Login</Link></li>
                                            <li><Link to="/register"><i className="fa fa-lock"></i> Register</Link></li>
                                        </ul>
                                        :
                                        <ul className="right_list_fix" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                                            <li><Link to={Routes.accountEdit}><button className='theme-btn-one btn-black-overlay btn_md'>+Upload Video</button></Link></li>
                                            {/* <li><Link to="/order-tracking"><i className="fa fa-truck"></i> Track your Order</Link></li> */}
                                            <li className="after_login"><img src={avater} alt="avater" /> {user.fullname} <i className="fa fa-angle-down"></i>
                                                <ul className="custom_dropdown">
                                                    {/* <li><Link to="/my-account"><i className="fa fa-tachometer"></i> Dashboard</Link></li> */}
                                                    <li><Link to={Routes.admin}><i className="fa fa-cubes"></i> I am Admin</Link></li>
                                                    <li >
                                                        <Link to={Routes.home} onClick={props.logoutUser} >
                                                            <i className="fa fa-sign-out"></i> Logout
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                }
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
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    loadAdmin: data => dispatch(loadAdmin(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);