import React from "react";

interface InfoCardProps {
  firstName: string;
  lastName: string;
  employer: string;
  startLocation: string;
  endLocation: string;
  startDistanceDelta: number;
  endDistanceDelta: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
  firstName,
  lastName,
  employer,
  startLocation,
  endLocation,
  startDistanceDelta,
  endDistanceDelta,
}) => {
  return (
    <div className="w-full space-y-4 rounded-md bg-white p-6 shadow">
      <h2 className="text-xl font-semibold">
        {firstName} {lastName}
      </h2>
      <p className="text-gray-700">
        <strong>Employer:</strong> {employer}
      </p>
      <p className="text-gray-700">
        <strong>Start Location:</strong> {startLocation}
      </p>
      <p className="text-gray-700">
        <strong>End Location:</strong> {endLocation}
      </p>
      <p className="text-gray-700">
        <strong>Distance to Start:</strong> {startDistanceDelta} miles
      </p>
      <p className="text-gray-700">
        <strong>Distance to End:</strong> {endDistanceDelta} miles
      </p>
    </div>
  );
};

export default InfoCard;
