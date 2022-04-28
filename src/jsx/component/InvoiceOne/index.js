import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import axios from 'axios';
import { connect } from 'react-redux'

import { selectVideo } from '../../../redux/User/user.actions';

const InvoiceOnes = (props) => {
  const [checkList1, setCheckList1] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const { selectVideo } = props;

  const history = useHistory();
  const { user: { user, video } } = props;
  const routeChange = () => {
      history.goBack()
    };

    function updateCheckList(info) {
      const data = [...checkList1]
      data.push(info);
      setCheckList1(data);
    }

    function removeFromCheckList(value) {
      const data = checkList1.filter(item => item !== value);
      setCheckList1(data);
    }

    async function httpUpdateVideo(status) {
      let data = {...video};
      if (status === 'accept') {
        data.status.approved = true;
      } else {
        data.status.approved = false;
        data.status.message = [...checkList1]
      }
      try {
            const response = await axios.post(`${process.env.REACT_APP_API}/upload`, data);
            selectVideo(response.data.data);
        } catch (error) {
            setStatus(error.response.data.message)
        }
        setLoading(false);
      }
      

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
                   <source src={video.video_url} type='' />
                 </video>
                </div>
                <div className="invoice-body table-responsive-md">
                  <div>
                    <h4 style={{marginBottom: '1rem'}}>Video uploaded by: </h4>
                    <h4 style={{marginBottom: '1rem'}}>Car brand: {video.car_brand}</h4>
                    <h4 style={{marginBottom: '1rem'}}>Car model: {video.car_model}</h4>
                    <h4 style={{marginBottom: '1rem'}}>Mobile brand: {video.mobile_brand}</h4>
                    <h4 style={{marginBottom: '1rem'}}>Damaged: {video.damaged ? "True" : "False"}</h4>
                    <h4 style={{marginBottom: '1rem'}}>Status: {video.status.approved ? "Accepted" : "Rejected"}</h4>
                  </div>
                  {
                    (!user.isAdmin && !video.status.approved && video.status.message.length > 0) &&
                    <ul>
                      {
                        video.status.message.map((item, index) => (
                          <li key={index.toString()}>#{index + 1}: {item}</li>
                        ))
                      }

                    </ul>
                  }
                 
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
                          <td><input type="checkbox" onClick={e => {
                            if (e.target.checked) {
                              updateCheckList('Reason one')
                            } else {
                              removeFromCheckList('Reason one')
                            }
                            
                          }}/></td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Checklist 2</td>
                          <td><input type="checkbox" onClick={e => {
                            if (e.target.checked) {
                              updateCheckList('Reason two')
                            } else {
                              removeFromCheckList('Reason two')
                            }
                            
                          }}/></td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Checklist 3</td>
                          <td><input type="checkbox" onClick={e => {
                            if (e.target.checked) {
                              updateCheckList('Reason three')
                            } else {
                              removeFromCheckList('Reason three')
                            }
                            
                          }}/></td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td>Checklist 4</td>
                          <td><input type="checkbox" onClick={e => {
                            if (e.target.checked) {
                              updateCheckList('Reason four')
                            } else {
                              removeFromCheckList('Reason four')
                            }
                            
                          }}/></td>
                        </tr>
                        <tr>
                          <th scope="row">5</th>
                          <td>Checklist 5</td>
                          <td><input type="checkbox" onClick={e => {
                            if (e.target.checked) {
                              updateCheckList('Reason five')
                            } else {
                              removeFromCheckList('Reason five')
                            }
                            
                          }}/></td>
                        </tr>
                      </tbody>
                    </table>
                  }
                </div>
                {
                  user.isAdmin &&
                  <div className="invoice-footer text-right">
                    <div className="authorise-sign">
                      {/* <button className="theme-btn-one btn-black-overlay btn_sm" >Video Paid</button> */}
    
                    </div>
                    <div className="buttons">
                      <button className="theme-btn-one btn-black-overlay btn_sm" onClick={() => httpUpdateVideo('accept')} style={{background: 'green'}}>Accept</button>
                      <button className="theme-btn-one btn-black-overlay btn_sm ml-2" onClick={() => httpUpdateVideo('')} style={{background: 'red'}}>Reject</button>
                    </div>
                  </div>
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

const mapDispatchToProps = dispatch => ({
  selectVideo: data => dispatch(selectVideo(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceOnes);
