import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useMap from "./hooks/useMap";
import Leaflet from "leaflet";
import 'leaflet/dist/leaflet.css';
import PointerIcon from "./pointer.png"
let icon = ""
if(typeof window !== 'undefined'){
	 icon = Leaflet.icon({
		iconUrl: PointerIcon,
		iconSize: [38, 38],
	});
}
const center = [10.4904997, -66.8632213];
const ProviderMapNew = ({ datos, ...restProps }) => {
	const { getCityMedicalNetwork, getCoords } = useMap();
	const [mapLoader, setMapLoader] = useState(true);
	const [activeCity, setActiveCity] = useState("");
	const [coords, setCoords] = useState(null);
	const { category } = restProps

	useEffect(() => {
		const fetchCoords = async () => {
			let response = await getCoords(
				datos.DIRECCION_PROVEEDOR,
				datos.CIUDAD_PROVEEDOR,
				datos.ESTADO_PROVEEDOR,
				"Venezuela"
			);
			// console.log(response);
			if (response.length !== 0) {
				let coordsObtained = [
					response[0].geometry.location.lat,
					response[0].geometry.location.lng,
				];
				setCoords(coordsObtained);
				setMapLoader(false);
			}
		};
		const fetchCoordsMp = async () => {
			
			let response = await getCityMedicalNetwork(datos.CODESTADO, datos.CODCIUDAD);
			console.clear()
			let response2 = await getCoords(
				datos.DIRECCION,
				datos.LUGARATC,
				response[0]?.DESCCIUDAD,
				datos.DESCESTADO,
				"Venezuela"
			);
			if (response2.length !== 0) {
				let coordsObtained = [
					response2[0].geometry.location.lat,
					response2[0].geometry.location.lng,
				];
				setCoords(coordsObtained);
				setMapLoader(false);
			}
		};
		if (category === "MP") {   
			fetchCoordsMp();
		} else {
			fetchCoords();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{!mapLoader && typeof window !== 'undefined' && (
				<MapContainer style={{ width: "100%", height: "80vh" }} center={coords} zoom={19}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker position={coords} icon={icon}>
						<Popup>
							{category === "MP"
								? ` ${datos.DIRECCION}, ${activeCity}, ${datos.DESCESTADO}, Venezuela`
								: ` ${datos.DIRECCION_PROVEEDOR}, ${datos.CIUDAD_PROVEEDOR}, ${datos.ESTADO_PROVEEDOR}, Venezuela.`}
						</Popup>
					</Marker>
				</MapContainer>
			)}
		</>
	);
};
export default ProviderMapNew;