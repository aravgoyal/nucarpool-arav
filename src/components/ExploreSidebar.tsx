import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { PublicUser, User } from "../utils/types";
import AbstractSidebarPage from "./AbstractSidebarPage";
import _ from "lodash";

/**
 * TODO:
 * 2. Add Prettier Tailwind omg please
 * 5. onClick StarButton with Favorites
 */

const previousMarkers: mapboxgl.Marker[] = [];
const clearMarkers = () => {
  previousMarkers.forEach((marker) => marker.remove());
  previousMarkers.length = 0;
};

interface ExploreSidebarProps {
  currentUser: User;
  reccs: PublicUser[];
  favs: PublicUser[];
  sent: PublicUser[];
  map: mapboxgl.Map;
  handleConnect: (modalUser: PublicUser) => void;
  handleFavorite: (otherUser: string, add: boolean) => void;
}

const emptyMessages = {
  recommendations: `We're unable to find any recommendations for you right now.
  We recommend reviewing your profile to make sure all information you've entered is accurate!`,
  favorites: `You have no users currently favorited.
  Click the star icon on the upper-right side of a user's card to add them to your favorites!`,
};

const ExploreSidebar = (props: ExploreSidebarProps) => {
  const [curList, setCurList] = useState<PublicUser[]>([]);
  const [curOption, setCurOption] = useState<"recommendations" | "favorites">(
    "recommendations"
  );

  const filteredRecs = (): PublicUser[] => {
    return _.differenceBy(props.reccs, props.sent, "id");
  };

  useEffect(() => {
    setCurList(curOption == "recommendations" ? filteredRecs : props.favs);
  }, [props.reccs, props.favs, curOption]);

  return (
    <div className="flex flex-col px-5 flex-shrink-0 h-full z-10 text-left bg-white">
      <div className="flex-row py-3">
        <div className="flex justify-center gap-3">
          <button
            className={
              curOption === "recommendations"
                ? "bg-northeastern-red rounded-xl p-2 font-semibold text-xl text-white"
                : "rounded-xl p-2 font-semibold text-xl text-black"
            }
            onClick={() => {
              setCurOption("recommendations");
              clearMarkers();
            }}
          >
            Recommendations
          </button>
          <button
            className={
              curOption === "favorites"
                ? "bg-northeastern-red rounded-xl p-2 font-semibold text-xl text-white"
                : "rounded-xl p-2 font-semibold text-xl text-black"
            }
            onClick={() => {
              setCurOption("favorites");
              clearMarkers();
            }}
          >
            Favorites
          </button>
        </div>
      </div>
      <AbstractSidebarPage
        currentUser={props.currentUser}
        userCardList={curList}
        rightButton={{
          text: "Connect",
          onPress: props.handleConnect,
          color: undefined,
        }}
        handleFavorite={props.handleFavorite}
        favs={props.favs}
        map={props.map}
        emptyMessage={emptyMessages[curOption]}
      />
    </div>
  );
};

export default ExploreSidebar;
