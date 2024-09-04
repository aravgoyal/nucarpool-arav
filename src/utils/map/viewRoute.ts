import mapboxgl from "mapbox-gl";
import { CarpoolAddress, CarpoolFeature, PublicUser, User } from "../types";
import { Role } from "@prisma/client";
import { trpc } from "../trpc";
import { SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import polyline from "@mapbox/polyline";
import { LineString } from "geojson";
import { StaticImageData } from "next/image";
import DriverStart from "../../../public/driver-start.png";
import DriverDest from "../../../public/driver-dest.png";
import BlueEnd from "../../../public/user-dest.png";
import RiderStart from "../../../public/rider-start.png";

const previousMarkers: (mapboxgl.Marker | mapboxgl.Popup)[] = [];
export const clearMarkers = () => {
  previousMarkers.forEach((element) => {
    element.remove();
  });
  previousMarkers.length = 0;
};

export const clearDirections = (map: mapboxgl.Map) => {
  if (map.getLayer("route")) {
    map.removeLayer("route");
  }
  if (map.getSource("route")) {
    map.removeSource("route");
  }
};

const createPopup = (text: string) => {
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }).setText(text);
  popup.addClassName("custom-marker-popup");
  return popup;
};

const createMarkerEl = (img: StaticImageData) => {
  const el = document.createElement("img");
  el.src = img.src;
  el.style.marginTop = "1em";
  return el;
};
interface ViewRouteProps {
  user: User;
  otherUser: PublicUser | undefined;
  map: mapboxgl.Map;
  userCoord: {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
  };
}

// Creates MapBox markers showing user's start address and the start area of the other user.
export const viewRoute = (props: ViewRouteProps) => {
  clearMarkers();
  clearDirections(props.map);
  console.log("view route has been called");
  const redCircle = createMarkerEl(DriverStart);
  const selfStartPopup = createPopup("My Start");
  const redSquare = createMarkerEl(DriverDest);
  redSquare.style.opacity = "0";
  const selfEndPopup = createPopup("My Dest.");
  const orangeStart = createMarkerEl(RiderStart);
  const redStart = createMarkerEl(redCircle);
  if (props.otherUser !== undefined) {
    const otherRole =
      props.otherUser.role.charAt(0).toUpperCase() +
      props.otherUser.role.slice(1).toLowerCase();
    const otherUserStartPopup = createPopup(otherRole + " Start");
    const otherUserStartMarker = new mapboxgl.Marker({
      element: otherRole === "Rider" ? orangeStart : redStart,
    })
      .setLngLat([
        props.otherUser.startPOICoordLng,
        props.otherUser.startPOICoordLat,
      ])
      .setPopup(otherUserStartPopup)
      .addTo(props.map);
    const otherUserEndPopup = createPopup(otherRole + " Dest.");
    const otherUserEndMarker = new mapboxgl.Marker({
      element: redSquare,
    })
      .setLngLat([
        props.otherUser.companyCoordLng,
        props.otherUser.companyCoordLat,
      ])
      .setPopup(otherUserEndPopup)
      .addTo(props.map);
    otherUserStartMarker.togglePopup();
    otherUserEndMarker.togglePopup();
    previousMarkers.push(otherUserStartMarker);
    previousMarkers.push(otherUserEndMarker);
  }

  selfEndPopup
    .setLngLat([props.userCoord.endLng, props.userCoord.endLat])
    .addTo(props.map);
  selfStartPopup
    .setLngLat([props.userCoord.startLng, props.userCoord.startLat])
    .addTo(props.map);

  previousMarkers.push(selfEndPopup);
  previousMarkers.push(selfStartPopup);
  let startPoiLng = props.user.startPOICoordLng;
  let startPoiLat = props.user.startPOICoordLat;
  let endPoiLng = props.user.companyPOICoordLng;
  let endPoiLat = props.user.companyPOICoordLat;
  if (props.otherUser) {
    startPoiLng = props.otherUser.startPOICoordLng;
    startPoiLat = props.otherUser.startPOICoordLat;
    endPoiLng = props.otherUser.companyCoordLng;
    endPoiLat = props.otherUser.companyCoordLat;
  }
  props.map.fitBounds([
    [
      Math.min(startPoiLng, endPoiLng) - 0.0075,
      Math.max(startPoiLat, endPoiLat) + 0.0075,
    ],
    [
      Math.max(startPoiLng, endPoiLng) + 0.0075,
      Math.min(startPoiLat, endPoiLat) - 0.0075,
    ],
  ]);
};

export function useGetDirections({
  points,
  map,
}: {
  points: [number, number][];
  map: mapboxgl.Map;
}) {
  const query = trpc.mapbox.getDirections.useQuery(
    {
      points: points,
    },
    {
      onSuccess: (response) => {
        const coordinates = response.routes[0].geometry;

        // Decode the encoded polyline into an array of coordinates
        const decodedCoordinates = polyline.decode(coordinates);

        // Convert the decoded coordinates into GeoJSON format
        const geoJsonCoordinates = decodedCoordinates.map(([lat, lon]) => [
          lon,
          lat,
        ]);

        // Create a GeoJSON LineString feature
        const lineStringFeature: LineString = {
          coordinates: geoJsonCoordinates,
          type: "LineString",
        };

        let beforeLayerId = "";

        if (map.getLayer("riders")) {
          beforeLayerId = "riders";
        } else if (map.getLayer("drivers")) {
          beforeLayerId = "drivers";
        }
        map.addLayer(
          {
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: lineStringFeature,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#61666b",
              "line-width": 6,
            },
          },
          beforeLayerId
        );
      },
      onError: (error) => {
        toast.error(`Something went wrong: ${error}`);
      },
      enabled: false,
      retry: false,
    }
  );
  useEffect(() => {
    // ensures that we don't run on page load
    if (points.length !== 0) {
      query.refetch();
    }
  }, [points]);
}
