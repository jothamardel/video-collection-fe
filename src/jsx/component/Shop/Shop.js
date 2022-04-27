import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ProductCard from '../Common/Product/ProductCard'
import Filter from './Filter'
import { useSelector } from "react-redux";


const Shop = (props) => {

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    let allData = [...props.products.products];

    const randProduct = (page) => {
        if (page) {
            let data = allData.sort((a, b) => 0.5 - Math.random())
            setProducts(data);
            setPage(page);
        }
    }

    useEffect(() => {
        setProducts(props.products.products);
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
                                            <source src="" type='mp4'/>
                                        </video>
                                    </div>
                                    <div className="content" style={{textAlign: 'start'}}>

                                        <p style={{marginBottom: '1rem'}}>FullName: </p>
                                        <p style={{marginBottom: '1rem'}}>Car Brand: </p>
                                        <p style={{marginBottom: '1rem'}}>Car Model: </p>
                                        <p style={{marginBottom: '1rem'}}>Mobile Brand: </p>
                                        <p style={{marginBottom: '1rem'}}>Damaged: </p>
                                       
                                        <button type="button" className="theme-btn-one btn-black-overlay btn_md" onClick={() => console.log("props.data.id")}>View</button>
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

export default connect(mapStateToProps)(Shop)
