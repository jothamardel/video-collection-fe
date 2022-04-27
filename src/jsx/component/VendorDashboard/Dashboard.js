import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import BarChart from './BarChart'
import LineChart from './LineChart'
import { useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import ProductCard from '../Furniture/Product/ProductCard';
import Routes from '../../../utils/Routes';
import axios from 'axios';


const Dashboard = (props) => {
    // let products = useSelector((state) => state.products.products);
    let { user: { user } } = props;
    const [uploads, setUploads] = useState([]);

   

    async function getUserUpload() {
        const response = await axios(`https://intense-eyrie-93047.herokuapp.com/upload/${user._id}`)
        setUploads(response.data.data);
    }

    useEffect(() => {
        getUserUpload();
    }, [uploads.length])

    console.log(uploads)
     if(!user._id) {
        return <Redirect to={Routes.login}/>
    }

    console.log("False", uploads.filter(item => {
        if (item.damaged === true) {
            return item
        }
    }).length)

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
                                if (item.damaged === true) {
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
                                if (item.damaged === false) {
                                    return item
                                }
                            }).length
                        }</h2>
                        <h4>Approved Videos</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="vendor_top_box">
                        <h2>0</h2>
                        <h4>Total Payments</h4>
                    </div>
                </div>
            </div>
            <div className='row' style={{ padding: '4rem', width: '100%'}}>
                {
                    uploads.length > 0 &&
                    uploads.map(item => (
                        <div className="vendor_top_box" key={item._id} style={{margin: '2rem'}}>
                            <div style={{width: '300px', }}>
                                <video controls style={{width: '100%', objectFit:'cover'}}>
                                    {/* <source type="video/mp4" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" /> */}
                                    <source type="video/mp4" src={item.video_url} />
                                </video>
                            </div>
                            <div style={{ textAlign: 'start', padding: '1rem'}}>
                                <p>Car Brand: {item.car_brand}</p>
                                <p>Car Model: {item.car_model}</p>
                                <p>Damaged: {!item.damaged ? "False" : "True"}</p>
                                <p>Mobile Brand: {item.mobile_brand}</p>
                                <p>Approval Status: {item.approval_status}</p>
                            </div>
                            <div>
                                <button style={{cursor: 'pointer'}} className='theme-btn-one btn-black-overlay btn_md'>View Details</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* <div className="row">
                <div className="col-lg-6">
                    <div className="mychart_area">
                        <LineChart />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mychart_area">
                        <BarChart />
                    </div>
                </div>
            </div> */}
            {/* <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <h4>Pending Products</h4>
                        <table className="table pending_table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.slice(1, 5).map((data, index)=>(
                                    <tr key={index}>
                                     <td><Link to={ `/product-details-one/${data.id}`}><img width="52px" src={data.img} alt="img" /></Link></td>
                                     <td><Link to={ `/product-details-one/${data.id}`}>{data.title}</Link></td>
                                     <td>${data.price}</td>
                                     <td>{parseInt(data.price)*3}</td>
                                    </tr>
                                ))}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="vendor_order_boxed pt-4">
                        <h4>Recent Orders</h4>
                        <table className="table pending_table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Product Details</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78153</Link></td>
                                    <td>Belted Trench Coat</td>
                                    <td><span className="badge badge-info">Shipped</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78154</Link></td>
                                    <td>Neck Velvet Dress</td>
                                    <td><span className="badge badge-warning">Pending</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78155</Link></td>
                                    <td>T-Shirt For Woman</td>
                                    <td><span className="badge badge-success">Confirmed</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78156</Link></td>
                                    <td>Fit-Flare Dress</td>
                                    <td><span className="badge badge-danger">Canceled</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78157</Link></td>
                                    <td>Long-Shirt For Men</td>
                                    <td><span className="badge badge-info">Shipped</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78158</Link></td>
                                    <td>Sharee for women</td>
                                    <td><span className="badge badge-info">Shipped</span></td>
                                </tr>
                                <tr>
                                    <td><Link to="/invoice-one" className="text-primary">#78159</Link></td>
                                    <td>Handbag for Girls</td>
                                    <td><span className="badge badge-info">Shipped</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}
        </>
    )
}

const mapStateProps = state => ({
    user: state.user
})

export default connect(mapStateProps)(Dashboard);
