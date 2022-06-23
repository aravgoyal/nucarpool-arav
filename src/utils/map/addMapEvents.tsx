import { GeoJSONSource, Map, NavigationControl, Popup } from "mapbox-gl";
import { createRoot } from "react-dom/client";
import CustomPopUp from "../../components/CustomPopUp";
import { UserInfo } from "../types";

const addMapEvents = (map: Map, userData: UserInfo) => {
	map.addControl(new NavigationControl(), "bottom-right");

	map.on("click", "clusters", (e) => {
		const features = map.queryRenderedFeatures(e.point, {
			layers: ["clusters"],
		});
		const clusterId = features[0].properties!.cluster_id;
		const source = map.getSource("company-locations") as GeoJSONSource;
		source.getClusterExpansionZoom(clusterId, (err, zoom) => {
			if (err) return;
			if (features[0].geometry.type === "Point") {
				map.easeTo({
					center: [
						features[0].geometry.coordinates[0],
						features[0].geometry.coordinates[1],
					],
					zoom: zoom,
				});
			}
		});
	});

	map.on("click", "unclustered-point", (e) => {
		if (!e.features) return;
		if (e.features[0].geometry.type != "Point") return;

		const coordinates = e.features[0].geometry.coordinates;
		const properties = e.features[0].properties as UserInfo;

		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		const popupNode = document.createElement("div");
		const root = createRoot(popupNode);
		root.render(<CustomPopUp {...properties} />);

		new Popup({ className: "custom-popup-container" })
			.setLngLat(e.lngLat)
			.setDOMContent(popupNode)
			.addTo(map);
	});

	map.on("mouseenter", "clusters", () => {
		map.getCanvas().style.cursor = "pointer";
	});
	map.on("mouseleave", "clusters", () => {
		map.getCanvas().style.cursor = "";
	});

	document.getElementById("fly")!.addEventListener("click", () => {
		map.flyTo({
			center: userData.companyCoord,
			essential: true,
		});
	});
};

export default addMapEvents;