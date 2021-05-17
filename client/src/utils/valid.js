export const validRegistration = ({
  name,
  email,
  phone,
  password,
  cf_password,
}) => {
  const err = {};

  if (!name.trim()) {
    err.name = "Please add your name.";
  } else if (!validateName(name)) {
    err.name = "Please enter a valid name.";
  }

  if (!email.trim()) {
    err.email = "Please add your email address.";
  } else if (!validateEmail(email)) {
    err.email = "Email format is incorrect";
  }

  if (!phone.trim()) {
    err.phone = "Please add your phone number.";
  } else if (!validatePhone(phone)) {
    err.phone = "Phone format is incorrect";
  }

  if (!password) {
    err.password = "Please add your password.";
  } else if (password.length < 6) {
    err.password = "Password must be at least six characters.";
  }

  if (password !== cf_password) {
    err.cf_password = "Passwords do not match.";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

export const validPost = ({
  dateTime,
  recordNum,
  TMK,
  location,
  propertyOwner,
  contactInfo,
  projectAddress,
  city,
  engineer,
  contractor,
  weather,
  weatherOtherValue,
  lotOccupied,
  lotOccupiedOtherValue,
  osdsFound,
  accessPortProvided,
  numOfAccessPorts,
  portSize,
  osdsIs,
  inletPipingFound,
  inletPipingDistance,
  outletPipingFound,
  outletPipingDistance,
  liquid,
  liquidDistanceToFinishedGrade,
  osdsLocation,
  rightOfEntryIssue,
  propertyLocation,
  osdsInService,
  numOfBedrooms,
  numOfOsdsUnits,
  totalVolume,
  solidPumpInterval,
  solidPumpIntervalOtherValue,
  overflowPipeToSewer,
  osdsType,
  osdsTypeOtherValue,
  bestDayTimeForVisit,
  contactName,
  contactPhone,
  email,
  mailingAddress,
  additionalNotes,
}) => {
  const err = {};

  if (!dateTime) {
    err.dateTime = "This field is required.";
  }

  if (!recordNum) {
    err.recordNum = "This field is required.";
  }
  if (!TMK) {
    err.TMK = "This field is required.";
  }
  if (!location) {
    err.location = "This field is required.";
  }
  if (!propertyOwner) {
    err.propertyOwner = "This field is required.";
  }
  if (!contactInfo) {
    err.contactInfo = "This field is required.";
  }
  if (!projectAddress) {
    err.projectAddress = "This field is required.";
  }
  if (!city) {
    err.city = "This field is required.";
  }
  if (!engineer) {
    err.engineer = "This field is required.";
  }
  if (!contractor) {
    err.contractor = "This field is required.";
  }

  if (!weather.trim()) {
    err.weather = "This field is required.";
  }

  if (!lotOccupied.trim()) {
    err.lotOccupied = "This field is required.";
  }

  if (!osdsFound) {
    err.osdsFound = "This field is required.";
  }

  // if (!osdsIs.length) {
  //   err.osdsIs = "This field is required.";
  // }

  if (!accessPortProvided) {
    err.accessPortProvided = "This field is required.";
  }

  if (!inletPipingFound) {
    err.inletPipingFound = "This field is required.";
  }

  if (!outletPipingFound) {
    err.outletPipingFound = "This field is required.";
  }

  if (!propertyLocation) {
    err.propertyLocation = "This field is required.";
  }

  // if (!osdsLocation.length) {
  //   err.osdsLocation = "This field is required.";
  // }

  // if (!rightOfEntryIssue.length) {
  //   err.rightOfEntryIssue = "This field is required.";
  // }

  // if (!password) {
  //   err.password = "Please add your password.";
  // } else if (password.length < 6) {
  //   err.password = "Password must be at least six characters.";
  // }

  // if (!phone.trim()) {
  //   err.phone = "Please add your phone number.";
  // } else if (!validatePhone(phone)) {
  //   err.phone = "Phone format is incorrect";
  // }

  // if (password !== cf_password) {
  //   err.cf_password = "Passwords do not match.";
  // }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function isNumeric(value) {
  if (isNaN(value)) return false;
  return true;
}

// Functions to validate user input
function validateEmail(email) {
  // esLint-disable-next-line
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateName(name) {
  if (name.length < 2 || !name.match(/^[A-Za-z- ]+$/)) {
    return false;
  }
  return true;
}

function validatePhone(phone) {
  if (phone.length !== 10 || !phone.match(/^\d{10}$/)) {
    return false;
  }
  return true;
}
