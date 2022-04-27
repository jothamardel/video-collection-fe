import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import axios from 'axios';

import Loader from '../Common/loader';

import { registerUser } from '../../../redux/User/user.actions';
import Routes from '../../../utils/Routes';

const RegisterArea = (props) => {
    const history = useHistory()
    const [fullName, setfullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [phone, setPhone] = useState('');
    const [terms, setTerms] = useState('');
    const [bank_name, setBankName] = useState('');
    const [account_name, setAccountName] = useState('');
    const [account_number, setAccountNumber] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [error, setError] = useState({});
    const [status, setStatus] = useState();

    let { registerUser, user: { loading, user } } = props;

    // Add to cart
    const register = (e) => {
        e.preventDefault();
        if (
            !fullName ||
            !username ||
            !email ||
            !country ||
            !password ||
            !confirmPass 
            ) {
                const err = {...error};
            err.empty = "Field(s) cannot be empty"
            setError(err);
            return;
        }
        
        // if (terms !== 'on') {
        //     const err = {...error};
        //     err.terms = 'Please accept the terms and conditions before proceeding.'
        //     setError(err);
        //     return;
        // }
        
        if (password !== confirmPass) {
            const err = {...error}
            err.mismatch = 'Password mismatch'
            setError(err);
            return;
        }
        setError({});
        
        console.log({
            fullName,
            username,
            email,
            country,
            password,
            confirmPass,
            account_name,
            bank_name,
            account_number,
            phone,
            location
        })

        httpCreateUser({
            fullName,
            username,
            email,
            country,
            password,
            confirmPass,
            account_name,
            bank_name,
            account_number,
            phone,
            location
        });


        // registerUser({
        //     fullName,
        //     username,
        //     email,
        //     country,
        //     password,
        //     confirmPass,
        // }, history);

    }

    async function httpCreateUser(data) {
        try {
            const response = await axios.post('https://intense-eyrie-93047.herokuapp.com/register', data);
            if(response.status === 201) {
                setStatus(response.status);
            }

        } catch (error) {
            console.log(error.response);
            setError({ message: error.response.data.message })
        }
    }


    async function getAllCountries() {
        const response = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json');
        const stateResponse = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json');
		setCountries(response.data);
        setStates(stateResponse.data)
    }

    useEffect(() => {
        getAllCountries();
    }, [countries.length, states.length])

    if (status === 201) {
        return <Redirect to={Routes.login}/>
    }
    if (user._id) {
        return <Redirect to={Routes.home}/>
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
                                    <h3>Register</h3>
                                    {error.empty && <p className='text-danger'>{error.empty}</p>}
                                    {error.message && <p className='text-danger' style={{ textAlign: 'center'}}>{error.message}</p>}
                                    <form onSubmit={register}>
                                        <div className="default-form-box">
                                            <label>Full Name<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={fullName} onChange={e => setfullName(e.currentTarget.value)} required/>
                                        </div>
                                        <div className="default-form-box">
                                            <label>Username<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.currentTarget.value)} required/>
                                        </div>
                                        <div className="default-form-box">
                                            <label>Email<span className="text-danger">*</span></label>
                                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.currentTarget.value)} required/>
                                        </div>
                                        <div className="default-form-box">
                                            <label>Phone<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.currentTarget.value)} required/>
                                        </div>
                                        <div className="default-form-box">
                                            <label>Bank Name<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={bank_name} onChange={e => setBankName(e.currentTarget.value)} required/>
                                        </div>
                                        <div className="default-form-box">
                                            <label>Account Name<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={account_name} onChange={e => setAccountName(e.currentTarget.value)} required/>
                                        </div>
                                        <div className="default-form-box">
                                            <label>Account Number<span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" value={account_number} onChange={e => setAccountNumber(e.currentTarget.value)} required/>
                                        </div>
                                        <div className="default-form-box">
                                            <label htmlFor="country">Country<span className="text-danger">*</span></label>
                                            <select className="form-control first_null" id="country" value={country} onChange={e => setCountry(e.currentTarget.value)}>
                                                <option >Select an option...</option>
                                                {
                                                    countries.length > 0 &&
                                                    countries.map((item, index) => (
                                                        <option key={item.id.toString()} value={item.name}>{item.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="default-form-box">
                                            <label htmlFor="country">Location<span className="text-danger">*</span></label>
                                            <select className="form-control first_null" id="country" value={location}  onChange={e => setLocation(e.currentTarget.value)}>
                                                <option >Select an option...</option>
                                                {
                                                    country && states.length > 0 &&
                                                    states.map((item, index) => {
                                                        if (item.country_name === country) {
                                                            return (
                                                                <option key={item.id.toString()} value={item.name}>{item.name}</option>
                                                                // <option key={item.id.toString()} value={item.name}>{item.name}</option>
                                                             )
                                                        }
                                                })
                                                }
                                            </select>
                                        </div>
                                        <div className="default-form-box">
                                            <label>Passwords<span className="text-danger">*</span></label>
                                            {error.mismatch && <p className='text-danger' style={{fontSize: '0.6rem'}}>{error.mismatch}</p>}
                                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.currentTarget.value)} required />
                                        </div>
                                        <div className="default-form-box">
                                            <label>Confirm Passwords<span className="text-danger">*</span></label>
                                            <input type="password" className="form-control" value={confirmPass} onChange={e => setConfirmPass(e.currentTarget.value)} required />
                                        </div>
                                        <div className="login_submit">
                                            {
                                                loading ?
                                                <button className="theme-btn-one btn-black-overlay btn_md" disabled >Loading...</button> :
                                                <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Register</button>
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
    registerUser: (data, history) => dispatch(registerUser(data, history))
});

export default connect(mapStateProps, mapDispatchToProps)(RegisterArea)
