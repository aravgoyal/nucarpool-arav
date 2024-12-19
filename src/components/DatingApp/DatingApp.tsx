import React, { useState } from "react";
import matchList from "./sample_carpool_data";
import InfoCard from "./InfoCard";

const DatingApp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeEffect, setFadeEffect] = useState(false);

  const triggerFade = (callback: () => void) => {
    setFadeEffect(true);
    setTimeout(() => {
      callback();
      setFadeEffect(false);
    }, 300);
  };

  const handleNext = () => {
    triggerFade(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % matchList.length);
    });
  };

  const handleReturn = () => {
    triggerFade(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + matchList.length) % matchList.length
      );
    });
  };

  const currentMatch = matchList[currentIndex];

  return (
    <div className="flex min-h-screen items-center justify-center bg-light-red p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-northeastern-red">
          Carpool Recommendations
        </h1>
        <div className={`${fadeEffect ? "animate-fade-out" : ""}`}>
          <InfoCard
            firstName={currentMatch.firstName}
            lastName={currentMatch.lastName}
            employer={currentMatch.employer}
            startLocation={currentMatch.startLocation}
            endLocation={currentMatch.endLocation}
            startDistanceDelta={currentMatch.startDistanceDelta}
            endDistanceDelta={currentMatch.endDistanceDelta}
          />
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleNext}
            className="rounded bg-good-green px-4 py-2 text-white hover:bg-green-900"
          >
            🤍
          </button>
          <button
            onClick={handleReturn}
            className="rounded bg-okay-yellow px-4 py-2 text-white hover:bg-yellow-700"
          >
            ⏎
          </button>
          <button
            onClick={handleNext}
            className="rounded bg-busy-red px-4 py-2 text-white hover:bg-northeastern-red"
          >
            ✖
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatingApp;
