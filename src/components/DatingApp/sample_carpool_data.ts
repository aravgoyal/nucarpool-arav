interface Match {
  firstName: string;
  lastName: string;
  employer: string;
  startLocation: string;
  endLocation: string;
  startDistanceDelta: number;
  endDistanceDelta: number;
}

const matchList: Match[] = [
  {
    firstName: "Sally",
    lastName: "Ride",
    employer: "SharkNinja",
    startLocation: "Mission Hill, MA",
    endLocation: "Natick, MA",
    startDistanceDelta: 0.5,
    endDistanceDelta: 3,
  },
  {
    firstName: "Neil",
    lastName: "Armstrong",
    employer: "Tesla",
    startLocation: "Cambridge, MA",
    endLocation: "Somerville, MA",
    startDistanceDelta: 2,
    endDistanceDelta: 1.5,
  },
  {
    firstName: "Ada",
    lastName: "Lovelace",
    employer: "Google",
    startLocation: "Boston, MA",
    endLocation: "Waltham, MA",
    startDistanceDelta: 1,
    endDistanceDelta: 2.2,
  },
  {
    firstName: "Grace",
    lastName: "Hopper",
    employer: "Amazon",
    startLocation: "Quincy, MA",
    endLocation: "Burlington, MA",
    startDistanceDelta: 3.4,
    endDistanceDelta: 4.1,
  },
  {
    firstName: "Alan",
    lastName: "Turing",
    employer: "Meta",
    startLocation: "Newton, MA",
    endLocation: "Cambridge, MA",
    startDistanceDelta: 1.8,
    endDistanceDelta: 0.9,
  },
  {
    firstName: "Margaret",
    lastName: "Hamilton",
    employer: "MIT",
    startLocation: "Somerville, MA",
    endLocation: "Lexington, MA",
    startDistanceDelta: 2.5,
    endDistanceDelta: 3.3,
  },
  {
    firstName: "Tim",
    lastName: "Berners-Lee",
    employer: "World Wide Web Consortium",
    startLocation: "Concord, MA",
    endLocation: "Boston, MA",
    startDistanceDelta: 4,
    endDistanceDelta: 5.2,
  },
];

export default matchList;
