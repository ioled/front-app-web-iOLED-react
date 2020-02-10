// Authenticated user reducer.
export default (state = null, { type, payload }) => {
	switch (type) {
		case 'FETCH_USER':
			return payload || false;
		default:
			return state;
	}
};
