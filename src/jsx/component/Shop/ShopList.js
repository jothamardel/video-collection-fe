import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Filter from './Filter'
import ListCard from './ListCard'
import { useSelector } from "react-redux";


const ShopList = (props) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1)
    let allData = [...props.products.products];

    const randProduct = (page) => {
        if(page){
            let data = allData.sort((a, b) => 0.5 - Math.random())
            setProducts(data);
            setPage(page);
        }
    }

    useEffect(() => {
        setProducts(props.products.products)
    }, [])

    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <Filter filterEvent={randProduct}/>
                    <div className="row">
                        {products.slice(1, 6).map((data, index)=>(
                            <ListCard data={data} key={index}/>
                        ))}
                        <div className="col-lg-12">
                        <ul className="pagination">
                                        <li className="page-item" onClick={(e) => { randProduct(page >1?page-1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        <li className={"page-item "+ (page === 1?"active":null)} onClick={(e) => { randProduct(1) }}><a className="page-link" href="#!">1</a></li>
                                        <li className={"page-item "+ (page === 2?"active":null)}  onClick={(e) => { randProduct(2) }}><a className="page-link" href="#!">2</a></li>
                                        <li className={"page-item "+ (page === 3?"active":null)}  onClick={(e) => { randProduct(3) }}><a className="page-link" href="#!">3</a></li>
                                        <li className="page-item" onClick={(e) => { randProduct(page <3?page+1:0) }}>
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

export default connect(mapStateToProps)(ShopList)
