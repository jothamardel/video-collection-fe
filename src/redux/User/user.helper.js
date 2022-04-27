

export const transformUserData = (data) => {
	const userDetails = {...data.user}
	userDetails.token = data.token;
	userDetails.expires_in = data.expires_in;
	return userDetails;
}