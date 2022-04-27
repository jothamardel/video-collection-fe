import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import Routes from "../../../utils/Routes";



function VerificationArea(props) {
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(false);
	const history =  useHistory();

	async function register(e) {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios(`${process.env.REACT_APP_API}/auth/verify/${token}`);
			Swal.fire({
				title: 'Success!',
				text: response.data.message,
				icon: 'success',
				showConfirmButton: true,
			});

			history.push(Routes.login);

		} catch (error) {
			console.log(error.response);
			Swal.fire({
				title: 'Error!',
				text: error.response.data.message,
				icon: 'error',
				showConfirmButton: true,
			})
		}
		setLoading(false);
	}

	return (
		<>
			<section id="login_area" className="ptb-100">
					<div className="container">
							<div className="row">
									<div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
											<div className="account_form">
													<h3>Account Verification</h3>
													<p style={{ textAlign: 'center'}}>Please enter the token sent to your email.</p>
													<form onSubmit={register}>
															<div className="default-form-box">
																	<label>Token<span className="text-danger">*</span></label>
																	<input type="number" className="form-control" value={token} onChange={e => setToken(e.currentTarget.value)} required/>
															</div>
															<div className="login_submit">
																{
																	loading ?
																	<button className="theme-btn-one btn-black-overlay btn_md" type="submit">verifying account...</button> :
																	<button className="theme-btn-one btn-black-overlay btn_md" type="submit">Verify Account</button>
																}
															</div>
													</form>
											</div>
									</div>
							</div>
					</div>
			</section>
		</>
	)
}

export default VerificationArea;