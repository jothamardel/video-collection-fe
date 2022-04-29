import { useEffect, useState } from "react";
import axios from "axios";



function Uploads({ id }) {
	const [uploads, setUploads] = useState([])
	async function getUserDetails() {
		 const response = await axios(`${process.env.REACT_APP_API}/upload/${id}`)
        console.log(response.data.data);
        setUploads(response.data.data);
	}

	useEffect(() => {
		getUserDetails();
	}, [uploads.length])
	return uploads.length;
}

export default Uploads;