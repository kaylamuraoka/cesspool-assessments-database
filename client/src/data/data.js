export const olympicMedals = [
  {
    country: "USA",
    gold: 36,
    silver: 38,
    bronze: 36,
  },
  {
    country: "China",
    gold: 51,
    silver: 21,
    bronze: 28,
  },
  {
    country: "Russia",
    gold: 23,
    silver: 21,
    bronze: 28,
  },
  {
    country: "Britain",
    gold: 19,
    silver: 13,
    bronze: 15,
  },
  {
    country: "Australia",
    gold: 14,
    silver: 15,
    bronze: 17,
  },
  {
    country: "Germany",
    gold: 16,
    silver: 10,
    bronze: 15,
  },
];

export const osdsDataColumns = [
  { name: "id", title: "#" },
  { name: "dateTime", title: "Date/Time" },
  { name: "recordNum", title: "Record No" },
  { name: "TMK", title: "TMK" },
  { name: "location", title: "Location" },
  { name: "propertyOwner", title: "Name" },
  { name: "propertyOwnerPhone", title: "Phone" },
  { name: "propertyOwnerEmail", title: "Email" },
  { name: "projectAddress", title: "Project Address" },
  { name: "engineer", title: "Engineer" },

  { name: "weather", title: "Weather" },
  { name: "lotOccupied", title: "Lot Occupied?" },
  { name: "osdsFound", title: "OSDS Found?" },
  { name: "accessPortProvided", title: "Provided?" },
  { name: "numOfAccessPorts", title: "Number" },
  { name: "portSize", title: "Size(in)" },
  // { name: "osdsIs", title: "OSDS Is:" },
  { name: "inletPipingFound", title: "Found?" },
  { name: "inletPipingDistance", title: "Distance to Ground" },
  { name: "outletPipingFound", title: "Found?" },
  { name: "outletPipingDistance", title: "Distance to Ground" },
  {
    name: "liquidDistanceToFinishedGrade",
    title: "Liquid Distance to Finished Grade",
  },
  // { name: "osdsLocation", title: "OSDS Location" },
  // { name: "rightOfEntryIssue", title: "Right of Entry Issue" },
  { name: "propertyLocation", title: "Property Location" },
  { name: "osdsInService", title: "OSDS In Service?" },
  { name: "numOfBedrooms", title: "Num of Bedrooms" },
  { name: "numOfOsdsUnits", title: "Num of OSDS Units" },
  { name: "totalVolume", title: "Total Volume" },
  { name: "solidPumpInterval", title: "Solid Pump Interval" },
  {
    name: "overflowPipeToSewer",
    title: "OSDS has overflow pipe to public sewer?",
  },
  { name: "osdsType", title: "OSDS Type" },
  { name: "bestDayTimeForVisit", title: "Best Day/Time for Future Visit" },
  { name: "additionalNotes", title: "Additional Notes" },
];

export const columnOrderArray = [
  "id",
  "dateTime",
  "recordNum",
  "TMK",
  "location",
  "propertyOwner",
  "propertyOwnerPhone",
  "propertyOwnerEmail",
  "projectAddress",
  "engineer",

  "weather",
  "lotOccupied",
  "osdsFound",
  "accessPortProvided",
  "numOfAccessPorts",
  "portSize",
  "inletPipingFound",
  "inletPipingDistance",
  "outletPipingFound",
  "outletPipingDistance",
  "liquidDistanceToFinishedGrade",
  "propertyLocation",
  "osdsInService",
  "numOfBedrooms",
  "numOfOsdsUnits",
  "totalVolume",
  "solidPumpInterval",
  "overflowPipeToSewer",
  "osdsType",
  "bestDayTimeForVisit",
  "additionalNotes",
];

export const columnWidthsArray = [
  { columnName: "id", width: 50 },
  { columnName: "dateTime", width: 180 },
  { columnName: "recordNum", width: 170 },
  { columnName: "TMK", width: 150 },
  { columnName: "location", width: 100 },
  { columnName: "propertyOwner", width: 150, align: "right" },
  { columnName: "propertyOwnerPhone", width: 140, align: "right" },
  { columnName: "propertyOwnerEmail", width: 160, align: "right" },
  { columnName: "projectAddress", width: 240 },
  { columnName: "engineer", width: 160, align: "right" },

  { columnName: "weather", width: 100, align: "right" },
  { columnName: "lotOccupied", width: 100, align: "right" },
  { columnName: "osdsFound", width: 70, align: "right" },
  { columnName: "accessPortProvided", width: 70, align: "right" },
  { columnName: "numOfAccessPorts", width: 100, align: "right" },
  { columnName: "portSize", width: 80 },
  { columnName: "inletPipingFound", width: 70 },
  { columnName: "inletPipingDistance", width: 80 },
  { columnName: "outletPipingFound", width: 70 },
  { columnName: "outletPipingDistance", width: 80 },
  { columnName: "liquidDistanceToFinishedGrade", width: 200 },
  { columnName: "propertyLocation", width: 120 },
  { columnName: "osdsInService", width: 120 },
  { columnName: "numOfBedrooms", width: 70 },
  { columnName: "numOfOsdsUnits", width: 70 },
  { columnName: "totalVolume", width: 80 },
  { columnName: "solidPumpInterval", width: 80 },
  { columnName: "overflowPipeToSewer", width: 70 },
  { columnName: "osdsType", width: 100 },
  { columnName: "bestDayTimeForVisit", width: 170 },
  { columnName: "additionalNotes", width: 240 },
];

export const booleanColumnsArray = [
  "osdsFound",
  "accessPortProvided",
  "inletPipingFound",
  "outletPipingFound",
];

export const columnBandsArray = [
  {
    title: "General Info",
    children: [
      { columnName: "dateTime" },
      { columnName: "recordNum" },
      { columnName: "TMK" },
      { columnName: "location" },
      {
        title: "Property Owner",
        children: [
          { columnName: "propertyOwner" },
          { columnName: "propertyOwnerPhone" },
          { columnName: "propertyOwnerEmail" },
        ],
      },
      { columnName: "projectAddress" },
      { columnName: "engineer" },
    ],
  },
  {
    title: "Site Info",
    children: [
      { columnName: "weather" },
      { columnName: "lotOccupied" },
      { columnName: "osdsFound" },
      {
        title: "Access Port",
        children: [
          { columnName: "accessPortProvided" },
          { columnName: "numOfAccessPorts" },
          { columnName: "portSize" },
        ],
      },
      {
        title: "Inlet Piping",
        children: [
          { columnName: "inletPipingFound" },
          { columnName: "inletPipingDistance" },
        ],
      },
      {
        title: "Outlet Piping",
        children: [
          { columnName: "outletPipingFound" },
          { columnName: "outletPipingDistance" },
        ],
      },
      {
        title: "Property Owner",
        children: [
          { columnName: "propertyOwner" },
          { columnName: "propertyOwnerPhone" },
          { columnName: "propertyOwnerEmail" },
        ],
      },
      { columnName: "projectAddress" },
      { columnName: "engineer" },
    ],
  },

  {
    title: "Homeowner Answers",
    children: [
      { columnName: "propertyLocation" },
      { columnName: "osdsInService" },
      { columnName: "numOfBedrooms" },
      { columnName: "numOfOsdsUnits" },
      { columnName: "totalVolume" },
      { columnName: "solidPumpInterval" },
      { columnName: "overflowPipeToSewer" },
      { columnName: "osdsType" },
      { columnName: "bestDayTimeForVisit" },
    ],
  },
];

export const generateData = (posts) => {
  let newPostsArr = [];
  for (let i = 0; i < posts.length; i++) {
    let weather = "";
    let lotOccupied = "";
    let liquid = "";
    let solidPumpInterval = "";
    let osdsType = "";

    if (posts[i].weather === "Other") {
      weather = `${posts[i].weather}: ${posts[i].weatherOtherValue}`;
    } else {
      weather = posts[i].weather;
    }

    if (posts[i].lotOccupied === "Other") {
      lotOccupied = `${posts[i].lotOccupied}: ${posts[i].lotOccupiedOtherValue}`;
    } else {
      lotOccupied = posts[i].lotOccupied;
    }

    if (posts[i].liquid && posts[i].liquidDistanceToFinishedGrade) {
      liquid = `${posts[i].liquid} found in OSDS, it's distance to finished grade: ${posts[i].liquidDistanceToFinishedGrade} `;
    } else {
      liquid = "";
    }

    if (posts[i].solidPumpInterval === "Other") {
      solidPumpInterval = `${posts[i].solidPumpInterval}: ${posts[i].solidPumpIntervalOtherValue}`;
    } else {
      solidPumpInterval = posts[i].solidPumpInterval;
    }

    if (posts[i].osdsType === "Other") {
      osdsType = `${posts[i].osdsType}: ${posts[i].osdsTypeOtherValue}`;
    } else {
      osdsType = posts[i].osdsType;
    }

    newPostsArr.push({
      id: i + 1,
      dateTime: posts[i].dateTime,
      recordNum: posts[i]._id,
      TMK: posts[i].TMK,
      location: posts[i].location,
      propertyOwner: posts[i].propertyOwner,
      propertyOwnerPhone: posts[i].propertyOwnerPhone,
      propertyOwnerEmail: posts[i].propertyOwnerEmail,
      projectAddress: posts[i].projectAddress,
      engineer: posts[i].engineer,

      weather: weather,
      lotOccupied: lotOccupied,
      osdsFound: posts[i].osdsFound,
      accessPortProvided: posts[i].accessPortProvided,
      numOfAccessPorts: posts[i].numOfAccessPorts,
      portSize: posts[i].portSize,
      // osdsIs: posts[i].osdsIs,
      inletPipingFound: posts[i].inletPipingFound,
      inletPipingDistance: posts[i].inletPipingDistance,
      outletPipingFound: posts[i].outletPipingFound,
      outletPipingDistance: posts[i].outletPipingDistance,
      liquidDistanceToFinishedGrade: liquid,
      // osdsLocation: posts[i].osdsLocation,
      // rightOfEntryIssue: posts[i].rightOfEntryIssue,
      propertyLocation: posts[i].propertyLocation,
      osdsInService: posts[i].osdsInService,
      numOfBedrooms: posts[i].numOfBedrooms,
      numOfOsdsUnits: posts[i].numOfOsdsUnits,
      totalVolume: posts[i].totalVolume,
      solidPumpInterval: solidPumpInterval,
      overflowPipeToSewer: posts[i].overflowPipeToSewer,
      osdsType: osdsType,
      bestDayTimeForVisit: posts[i].bestDayTimeForVisit,
      additionalNotes: posts[i].additionalNotes,
    });
  }

  return newPostsArr;
};
