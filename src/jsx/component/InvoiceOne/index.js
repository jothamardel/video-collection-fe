import React from 'react'
import { useHistory } from 'react-router-dom'
// import img
import img1 from '../../assets/img/invoice/invoice.svg'
import logo from '../../assets/img/logo.png'
import sign from '../../assets/img/invoice/sign.png'
import { connect } from 'react-redux'

const InvoiceOnes = (props) => {
  const history = useHistory();
  const { user: { user } } = props;
  const routeChange = () => {
      history.goBack()
    };
    return (
        <>
      <section className="theme-invoice-1 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 m-auto">
            <div className="back_btn_emial">
                            <button className="theme-btn-one btn-black-overlay btn_sm" onClick={routeChange}>
                                <i className="fa fa-arrow-left mr-2"></i>Go Back
                            </button>
                        </div>
              <div className="invoice-wrapper">
                <div className="invoice-header">
                 <video controls style={{ width: '100%'}}>
                   <source src="" type='' />
                 </video>
                </div>
                <div className="invoice-body table-responsive-md">
                  <div>
                    <h4 style={{marginBottom: '1rem'}}>Video uploaded by: </h4>
                    <h4 style={{marginBottom: '1rem'}}>Car brand: </h4>
                    <h4 style={{marginBottom: '1rem'}}>Car model: </h4>
                    <h4 style={{marginBottom: '1rem'}}>Mobile brand: </h4>
                    <h4 style={{marginBottom: '1rem'}}>Damaged: </h4>
                    <h4 style={{marginBottom: '1rem'}}>Status: </h4>
                  </div>
                  {
                    user.isAdmin &&
                    <table className="table table-borderless mb-0">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Checklist</th>
                          <th scope="col">check</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Checklist 1</td>
                          <td><input type="checkbox"/></td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Checklist 2</td>
                          <td><input type="checkbox"/></td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Checklist 3</td>
                          <td><input type="checkbox"/></td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td>Checklist 4</td>
                          <td><input type="checkbox"/></td>
                        </tr>
                        <tr>
                          <th scope="row">5</th>
                          <td>Checklist 5</td>
                          <td><input type="checkbox"/></td>
                        </tr>
                      </tbody>
                    </table>
                  }
                </div>
                {
                  user.isAdmin &&
                  <div className="invoice-footer text-right">
                    <div className="authorise-sign">
                      <button className="theme-btn-one btn-black-overlay btn_sm" >Video Paid</button>
    
                    </div>
                    <div className="buttons">
                      <button className="theme-btn-one btn-black-overlay btn_sm" style={{background: 'green'}}>Accept</button>
                      <button className="theme-btn-one btn-black-overlay btn_sm ml-2" style={{background: 'red'}}>Reject</button>
                    </div>
                  </div>
                }

                {
                  // !user.isAdmin &&
                  // <div className="invoice-footer text-right">
                  //   <div className="authorise-sign">
                  //     <button className="theme-btn-one btn-black-overlay btn_sm" >Video Paid</button>
    
                  //   </div>
                  //   <div className="buttons">
                  //     <button className="theme-btn-one btn-black-overlay btn_sm" style={{background: 'green'}}>Edit</button>
                  //     <button className="theme-btn-one btn-black-overlay btn_sm ml-2" style={{background: 'red'}}>Delete</button>
                  //   </div>
                  // </div>
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
})

export default connect(mapStateToProps)(InvoiceOnes)
