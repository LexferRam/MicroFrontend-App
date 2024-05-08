import axios from "axios";
const axiosNewinstance = axios.create({
	baseURL:`https://maps.googleapis.com/maps/api/geocode/`,
	withCredentials:false
})


const useMap = () => {
	const getCityMedicalNetwork = async (stateCode, cityCode) => {
		try {
			let service = `/dbo/medical_netword/get_city`;
			let params = {
				cpCodPais: "001",
				cpcodEstado: stateCode,
				cpCodCiudad: cityCode,
			};
			let response = await axios.post(service, params);
			if (response.status === 200 && response.data.p_cursor.length !== 0) {
				return response.data.p_cursor;
			}
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	};
	const getCoords = async (address,lugaratencion="", city, state,country) => {
		
		try {
			// let service = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=Av.%20Guaicaipuro,%20El%20llanito,%20Edif.%20Maipures,%20Caracas,%20${country}&key=AIzaSyC86lt1edDOgCdJsQ3tn2Y5leKqnJsTVxA`;
			let service = `json?address=%20${address},%20${lugaratencion},%20${city},%20${state},%20${country}&key=AIzaSyC86lt1edDOgCdJsQ3tn2Y5leKqnJsTVxA`;
			let response = await axiosNewinstance.post(service);
			// response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			if (response.status === 200 && response.data.results.length) {
				return response.data.results;
			}
		} catch (error) {
			console.log(error);
			return [];
		}
	};
	return {
		getCityMedicalNetwork,
		getCoords,
	};
};

export default useMap;
