import moment from "moment";
const currDateTime = moment().utcOffset("-10:00").format("YYYY-MM-DDThh:mm");

export const weatherOptions = ["Sunny", "Clear", "Cloudy", "Shower"];

export const lotOccupiedOptions = ["Yes", "Vacant", "No House"];

export const postDataInitialState = {
  dateTime: currDateTime,
  recordNum: "",
  TMK: "",
  location: "",
  propertyOwner: "",
  contactInfo: "",
  projectAddress: "",
  city: "",
  engineer: "",
  weather: "",
  weatherOtherValue: "",
  lotOccupied: "",
  lotOccupiedOtherValue: "",
  osdsFound: "No",
  accessPortProvided: "No",
  numOfAccessPorts: "",
  portSize: "",
  osdsIs: {
    dry: false,
    wet_water_scum: false,
    wet_sludge: false,
    odorous: false,
    unknown: false,
  },
  inletPipingFound: "No",
  inletPipingDistance: "",
  outletPipingFound: "No",
  outletPipingDistance: "",
  liquid: "",
  liquidDistanceToFinishedGrade: "",
  osdsLocation: {
    frontyard: false,
    backyard: false,
    nextToBldg: false,
    other: false,
    otherValue: "",
  },
  rightOfEntryIssue: {
    none: false,
    fenced: false,
    gated: false,
    dogs: false,
    other: false,
    otherValue: "",
  },
  propertyLocation: "",
  osdsInService: "",
  numOfBedrooms: "",
  numOfOsdsUnits: "",
  totalVolume: "",
  solidPumpInterval: "",
  solidPumpIntervalOtherValue: "",
  overflowPipeToSewer: "",
  osdsType: "",
  osdsTypeOtherValue: "",
  bestDayTimeForVisit: currDateTime,
  additionalNotes: "",
};
