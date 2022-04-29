import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import img
import bg1 from '../../assets/img/invoice/bg3.jpg'
import logo from '../../assets/img/logo.png'
import shap from '../../assets/img/invoice/shape.png'
import { connect } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'


const InvoiceTwos = (props) => {
    const [uploads, setUploads] = useState([]);
    const [payStatus, setPayStatus] = useState();
    const [paid, setPaid] = useState(0);
    const { user: { userDetails } } = props;
    
    const history = useHistory();
    const routeChange = () => {
        history.goBack()
      };

    async function getUserUpload() {
        const response = await axios(`${process.env.REACT_APP_API}/upload/${userDetails._id}`)
        console.log(response.data.data);
        setUploads(response.data.data);
    }

    async function postPayment(data) {
        const payment = {
            total_videos: data.length,
            unpaid_videos: data.length - paid,
            total_videos_paid: paid,
            user: userDetails._id
        }

        const response = await axios.post(`${process.env.REACT_APP_API}/paid`, payment)
        setPayStatus(response.data.data);
        Swal.fire({
            title: 'Success!',
            text: `Paid for ${response.data.data.total_videos_paid} videos`,
            icon: 'success',
            showConfirmButton: true,
        })
    }



    function pay() {
        const approvedVideos = uploads.filter(item => item.status.approved);
        console.log("Number of ", approvedVideos);

        if (!(approvedVideos.length)){
            Swal.fire({
                title: 'Error!',
                text: 'No approved videos listed',
                icon: 'error',
                showConfirmButton: true,
            })
            return
        }

        if (paid > approvedVideos.length){
            Swal.fire({
				title: 'Error!',
				text: 'Not allowed to pay for more than total number of videos',
				icon: 'error',
				showConfirmButton: true,
			})
            return
        }

        if (!(Number(paid))){
            Swal.fire({
				title: 'Error!',
				text: 'Please enter number of videos paid.',
				icon: 'error',
				showConfirmButton: true,
			})
            return
        }
        
        postPayment(approvedVideos);
    }

    useEffect(() => {
        getUserUpload();
    }, [uploads.length])
    return (
        <>
            <section className="theme-invoice-4 pb-100">
        <div className="container">
            <div className="row">
                <div className="col-xl-9 m-auto">
                <div className="back_btn_emial">
                            <button className="theme-btn-one btn-black-overlay btn_sm" onClick={routeChange}>
                                <i className="fa fa-arrow-left mr-2"></i>Go Back
                            </button>
                        </div>
                    <div className="invoice-wrapper">
                        <div className="invoice-header">
                            <img src={bg1} className="background-invoice" alt="logo" />
                            <img src={logo} className="img-fluid" alt="logo" />
                        </div>
                        <div className="invoice-body">
                            <div className="top-sec">
                                <div className="row">
                                    <div className="col-xxl-8 col-md-7">
                                        <div className="address-detail">
                                            <div className="mt-2">
                                                <h4 className="mb-2">
                                                    { userDetails.fullName}
                                                </h4>
                                                <h4 className="mb-2">{userDetails.bank_name}</h4>
                                                <h4 className="mb-0">{userDetails.account_number}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-md-5">
                                        <ul className="date-detail">
                                            <li><span>issue date :</span>
                                                <h4> 20 march, 2020</h4>
                                            </li>
                                            <li><span>Mobile no :</span>
                                                <h4>{userDetails.phone}</h4>
                                            </li>
                                            <li><span>email :</span>
                                                <h4>{ userDetails.email}</h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="title-sec">
                                <h2 className="title">invoice</h2>
                                <div className="row">
                                    <div className="col-6">
                                        <button className="theme-btn-one btn-black-overlay btn_sm">export as PDF</button>
                                    </div>
                                    <div className="col-6 text-right">
                                        <button className="theme-btn-one btn-black-overlay btn_sm">print</button>
                                    </div>
                                </div>
                            </div>
                            <div className="table-sec">
                            <div className="table-responsive">
                                <table className="table table-borderless table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Car Brand</th>
                                            <th scope="col">Car Model</th>
                                            <th scope="col">Approved</th>
                                            <th scope="col">total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            uploads.length > 0 &&
                                            uploads.map(item => {
                                                if(item.status.approved) {

                                                    return (
                                                        <tr key={item._id}>
                                                            <th scope="row">1</th>
                                                            <td>{item.car_brand}</td>
                                                            <td>{item.car_model}</td>
                                                            <td>{item.status.approved ? "Approved" : "Rejected"}</td>
                                                            <td>$100</td>
                                                        </tr>
                                                     )
                                                }
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                                <div className="text-right">
                                    <input type="number" onChange={e => setPaid(e.currentTarget.value)} placeholder='Enter number of videos to paid for'/>
                                    <div onClick={pay} style={{cursor: 'pointer'}} className="table-footer">
                                        <span>Pay for:</span>
                                        <span>{uploads.filter(item => item.status.approved).length} video(s)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="invoice-footer">
                            <img src={shap} className="img-fluid design-shape" alt="img" />
                            <ul>
                                <li>
                                    <i className="fa fa-map"></i>
                                    <div>
                                        <h4>Skillseed</h4>
                                        <h4>Video Collection</h4>
                                    </div>
                                </li>
                                <li>
                                    <i className="fa fa-phone"></i>
                                    <div>
                                        <h4>+1-202-555-0144</h4>
                                        <h4>+1-202-555-0117</h4>
                                    </div>
                                </li>
                                <li>
                                    <i className="fa fa-envelope"></i>
                                    <div>
                                        <h4>support@skillseed.com</h4>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

        </>
    )
}

const mapStateProps = state => ({
    user: state.user
})

export default connect(mapStateProps)(InvoiceTwos)
