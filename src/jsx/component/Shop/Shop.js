import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ProductCard from '../Common/Product/ProductCard'
import Filter from './Filter'
import { useSelector } from "react-redux";
import Routes from '../../../utils/Routes';
import { selectVideo } from '../../../redux/User/user.actions';
import axios from 'axios';

const Shop = (props) => {

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    let allData = [...props.products.products];

    const { selectVideo } = props;

    const randProduct = (page) => {
        if (page) {
            let data = allData.sort((a, b) => 0.5 - Math.random())
            setProducts(data);
            setPage(page);
        }
    }

    async function getAllUpload() {
        const response = await axios(`${process.env.REACT_APP_API}/upload/all`)
        setProducts(response.data.data);
    }


    useEffect(() => {
        getAllUpload();
    }, [])

    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <Filter filterEvent={randProduct}/>
                    <div className="row">
                        {products.map((data, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                <div className="product_wrappers_one">
                                    <div className="">
                                        <video controls style={{ width: '100%'}}>
                                            <source src={data.video_url} type='video/mp4'/>
                                        </video>
                                    </div>
                                    <div className="content" style={{textAlign: 'start'}}>

                                        <p style={{marginBottom: '1rem'}}>FullName: </p>
                                        <p style={{marginBottom: '1rem'}}>Car Brand: {data.car_brand}</p>
                                        <p style={{marginBottom: '1rem'}}>Car Model: {data.car_model}</p>
                                        <p style={{marginBottom: '1rem'}}>Mobile Brand: {data.mobile_brand}</p>
                                        <p style={{marginBottom: '1rem'}}>Damaged: {data.damaged}</p>
                                       <Link to={Routes.invoiceOne} style={{width: '100%'}} onClick={() => selectVideo(data)}>
                                         <button style={{width: '100%'}}  type="button" className="theme-btn-one btn-black-overlay btn_md" onClick={() => console.log("props.data.id")}>View</button>
                                       </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-lg-12">
                            <ul className="pagination">
                                <li className="page-item" onClick={(e) => { randProduct(page > 1 ? page - 1 : 0) }}>
                                    <a className="page-link" href="#!" aria-label="Previous">
                                        <span aria-hidden="true">«</span>
                                    </a>
                                </li>
                                <li className={"page-item " + (page === 1 ? "active" : null)} onClick={(e) => { randProduct(1) }}><a className="page-link" href="#!">1</a></li>
                                <li className={"page-item " + (page === 2 ? "active" : null)} onClick={(e) => { randProduct(2) }}><a className="page-link" href="#!">2</a></li>
                                <li className={"page-item " + (page === 3 ? "active" : null)} onClick={(e) => { randProduct(3) }}><a className="page-link" href="#!">3</a></li>
                                <li className="page-item" onClick={(e) => { randProduct(page < 3 ? page + 1 : 0) }}>
                                    <a className="page-link" href="#!" aria-label="Next">
                                        <span aria-hidden="true">»</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const mapStateToProps = state => ({
    products: state.products
})

const mapDispatchToProps = dispatch => ({
    selectVideo: video => dispatch(selectVideo(video))
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
