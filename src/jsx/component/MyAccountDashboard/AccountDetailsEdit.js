import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'

import img1 from '../../assets/img/team/team1.png'
import Routes from '../../../utils/Routes';

const AccountDetailsEdit = (props) => {
    const [loadValue, setLoadValue] = useState(0);
    const [video_url, setVideoUrl] = useState('');
    const [car_brand, setCarBrand] = useState('');
    const [car_model, setCarModel] = useState('');
    const [mobile_brand, setMobileBrand] = useState('');
    const [damaged, setDamaged] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const { user: { user } } = props;

    const history = useHistory();
    const routeChange = () => {
        history.goBack()
    };

  async function handleUpload(imageData, setFunc) {
		
		const data = new FormData();
		const cloudName = "daqj8bnrb";
	
		data.append("file", imageData);
		data.append("upload_preset", "my_default");
	
		return axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, data, {
			onUploadProgress: ProgressEvent => {
				setLoadValue(ProgressEvent.loaded / ProgressEvent.total*100)
			}
		}).then(async (res) => {
			 setFunc(res.data.secure_url);
			 setLoadValue(0);
		}).catch(console.log);
	}

    function uploadVideo(data) {
        handleUpload(data, setVideoUrl)
    }

   async  function httpSaveVideo(e) {
        e.preventDefault()
        setLoading(true);
        const data = {

            user: user._id,
            video_url,
            car_brand,
            car_model,
            mobile_brand,
            damaged: damaged === 'on' ? true : false
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/upload`, data);
            setStatus(response.data.message);
        } catch (error) {
            setStatus(error.response.data.message)
        }
        setLoading(false);
    }

    if(!user._id) {
        return <Redirect to={Routes.home}/>
    }


return (
    <>
    <section id="account_edit" className="pt-100 pb-100">
        <div className="container">
            <div className="row">
            <div className="col-lg-6">
                    <div className="back_btn">
                       {/* <Link to="/" onClick={routeChange}><i className="fa fa-arrow-left"></i>Back to Dashboard</Link> */}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <div className="">
                        <div className="account_thumb_img">
                        
                            {
                                // <div className="fixed_icon" style={{position: 'relative', marginLeft: '10rem', background: 'orange', textAlign: 'center', cursor: 'pointer'}}>
                                //  {/* <i className="fa fa-camera" style={{position: 'absolute', top: '0.8rem', left: '0.5rem' }}></i>  */}
                                // </div>
                            }
                        </div>
                            <input type="file" onChange={e => uploadVideo(e.target.files[0])} style={{border: '1px dotted #eee', color: 'orange', width: '100%', cursor: 'pointer'}}/>
                            {/* <p style={{textAlign: 'center'}}>click to upload video</p> */}
                            <p style={{color: `${loadValue > 0 ?'green' : 'grey'}`}}>{`${loadValue > 0 ?" Uploading..."+ Math.floor(loadValue)+'%' : "click to upload video"}`}</p>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="account_setting">
                        <div className="account_setting_heading">
                            <h2>Video Details</h2>
                            <p>Upload car video.</p>
                            {status && <p style={{color: 'green'}}>{status}</p>}
                        </div>
                        <form id="account_info_form" onSubmit={httpSaveVideo}>
                            {/* <div className="input-radio">
                                <span className="custom-radio"><input type="radio" value="1" name="id_gender" defaultChecked/> Mr.</span>
                                <span className="custom-radio"><input type="radio" value="1" name="id_gender"/> Mrs.</span>
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="f_name">Car Brand</label>
                                <input type="text" onChange={e => setCarBrand(e.currentTarget.value)} className="form-control" id="f_name" placeholder="Toyota" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="f_name">Car Model</label>
                                <input type="text" onChange={e => setCarModel(e.currentTarget.value)} className="form-control" placeholder="Camry" required />
                            </div>
                            <div className="form-group">
                                <label  htmlFor="email_address">Mobile Brand</label>
                                <input type="text"onChange={e => setMobileBrand(e.currentTarget.value)} className="form-control" id="email_address"
                                    placeholder="iPhone 12" required />
                            </div>
                            <div className="form-group">
                                <label  htmlFor="email_address" style={{marginRight: '1rem'}}>Damaged</label>
                                <input type="checkbox" className="" onChange={e => setDamaged(e.currentTarget.value)} id="email_address"
                                    placeholder="" />
                            </div>
                            
                            {/* <div className="form-group">
                                <label  htmlFor="current_password">Current Password</label>
                                <input type="password" className="form-control" id="current_password"
                                    placeholder="Enter your current password" required />
                                <input type="password" className="form-control" id="new_password"
                                    placeholder="Enter your new password" required />
                                <input type="password" className="form-control" id="re_password"
                                    placeholder="Re-type your new password" required />
                            </div> */}
                            {
                                loading ? <button disabled className="theme-btn-one bg-black btn_sm">Loading...</button> : 
                                <button type="submit"  className="theme-btn-one bg-black btn_sm">Upload Video</button>
                            }
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
});

export default connect(mapStateToProps)(AccountDetailsEdit)
