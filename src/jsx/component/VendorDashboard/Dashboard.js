import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


import Routes from '../../../utils/Routes';
import axios from 'axios';
import { selectVideo } from '../../../redux/User/user.actions';


const Dashboard = (props) => {
    // let products = useSelector((state) => state.products.products);
    let { user: { user }, selectVideo } = props;
    const [uploads, setUploads] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState();

   

    async function getUserUpload() {
        const response = await axios(`${process.env.REACT_APP_API}/upload/${user._id}`)
        setUploads(response.data.data);
    }
    
    
    async function getPayment() {
        const response = await axios(`${process.env.REACT_APP_API}/paid/${user._id}`)
        console.log(response.data.data);
        setPaymentStatus(response.data.data);
        
    }

    useEffect(() => {
        getUserUpload();
    }, [uploads.length])

    useEffect(() => {
        getPayment();
    }, [])

     if(!user._id) {
        return <Redirect to={Routes.login}/>
    }


    return (
        <>
            <div className="" style={{display: 'flex', justifyContent:'center', flexWrap: 'wrap'}}>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box">
                        <h2>{uploads.length}</h2>
                        <h4>Total Videos</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box">
                        <h2>{
                            uploads.filter(item => {
                                if (item.status.approved === false) {
                                    return item
                                }
                            }).length
                        }</h2>
                        <h4>Rejected Videos</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box">
                        <h2>{
                             uploads.filter(item => {
                                if (item.status.approved) {
                                    return item
                                }
                            }).length
                        }</h2>
                        <h4>Approved Videos</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box">
                        <h2>{ paymentStatus && paymentStatus.total_videos_paid}</h2>
                        <h4>Total Payments</h4>
                    </div>
                </div>
            </div>
            <div className='row' style={{ padding: '4rem', width: '100%'}}>
                {
                    uploads.length > 0 &&
                    uploads.map(item => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={item._id}>
                            <div className="product_wrappers_one">
                                <div className="">
                                    <video controls style={{ width: '100%'}}>
                                        <source src={item.video_url} type='video/mp4'/>
                                    </video>
                                </div>
                                <div className="content" style={{textAlign: 'start'}}>
                                    <p style={{marginBottom: '1rem'}}>Car Brand: {item.car_brand}</p>
                                    <p style={{marginBottom: '1rem'}}>Car Model: {item.car_model}</p>
                                    <p style={{marginBottom: '1rem'}}>Mobile Brand: {item.mobile_brand}</p>
                                    <p style={{marginBottom: '1rem'}}>Damaged: {item.damaged ? "True" : "False"}</p>
                                    <Link to={Routes.invoiceOne} style={{width: '100%'}} onClick={() => selectVideo(item)}>
                                        <button style={{width: '100%'}}  type="button" className="theme-btn-one btn-black-overlay btn_md" onClick={() => console.log("props.data.id")}>View</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                    ))
                }
            </div>
                {
                    !uploads.length &&
                    <div style={{textAlign: 'center'}}>
                        <Link to={Routes.accountEdit}>
                            <button>+ Upload Video</button>
                        </Link>
                        <p style={{ textAlign: 'center'}}>No video(s) uploaded</p>
                    </div>
                }
        </>
    )
}

const mapStateProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    selectVideo: video => dispatch(selectVideo(video))
})

export default connect(mapStateProps, mapDispatchToProps)(Dashboard);
