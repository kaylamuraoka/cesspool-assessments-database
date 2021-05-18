const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    dateTime: {
      type: String,
      required: [true, "Please enter the date and time!"],
    },
    recordNum: {
      type: Number,
      required: [true, "Please enter the record number!"],
    },
    TMK: {
      type: String,
      required: [true, "Please enter the TMK!"],
    },
    location: {
      type: String,
      enum: ["Waianae", "Nanakuli", "Waimanalo"],
      required: [true, "Please enter the location!"],
    },
    propertyOwner: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    projectAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    engineer: {
      type: String,
      required: true,
    },
    contractor: {
      type: String,
      required: true,
    },
    weather: {
      type: String,
      required: true,
    },
    weatherOtherValue: {
      type: String,
      default: "",
    },
    lotOccupied: {
      type: String,
      required: true,
    },
    lotOccupiedOtherValue: {
      type: String,
      default: "",
    },
    osdsFound: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    accessPortProvided: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    numOfAccessPorts: {
      type: Number,
      default: "",
    },
    portSize: {
      type: Number,
      default: "",
    },
    osdsIs: {
      dry: {
        type: Boolean,
        default: false,
      },
      wet_water_scum: {
        type: Boolean,
        default: false,
      },
      wet_sludge: {
        type: Boolean,
        default: false,
      },
      odorous: {
        type: Boolean,
        default: false,
      },
      unknown: {
        type: Boolean,
        default: false,
      },
    },
    inletPipingFound: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    inletPipingDistance: {
      type: Number,
      default: "",
    },
    outletPipingFound: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    outletPipingDistance: {
      type: Number,
      default: "",
    },
    liquid: {
      type: String,
      default: "",
    },
    liquidDistanceToFinishedGrade: {
      type: Number,
      default: "",
    },
    osdsLocation: {
      frontyard: {
        type: Boolean,
        default: false,
      },
      backyard: {
        type: Boolean,
        default: false,
      },
      nextToBldg: {
        type: Boolean,
        default: false,
      },
      other: {
        type: Boolean,
        default: false,
      },
      otherValue: {
        type: String,
        default: "",
      },
    },
    rightOfEntryIssue: {
      none: {
        type: Boolean,
        default: false,
      },
      fenced: {
        type: Boolean,
        default: false,
      },
      gated: {
        type: Boolean,
        default: false,
      },
      dogs: {
        type: Boolean,
        default: false,
      },
      other: {
        type: Boolean,
        default: false,
      },
      otherValue: {
        type: String,
        default: "",
      },
    },
    propertyLocation: {
      type: String,
      enum: ["OSDS", "Public Sewer", "Unknown"],
      default: "Unknown",
    },
    osdsInService: {
      type: String,
      enum: ["Yes", "No (Abandoned)", "Unknown"],
      default: "Unknown",
    },
    numOfBedrooms: {
      type: Number,
    },
    numOfOsdsUnits: {
      type: Number,
    },
    totalVolume: {
      type: Number,
    },
    solidPumpInterval: {
      type: String,
      enum: ["<6", "6-9", "9-12", "12-24", ">24", "Other", "Unknown"],
    },
    solidPumpIntervalOtherValue: {
      type: String,
      default: "",
    },
    overflowPipeToSewer: {
      type: String,
      enum: ["Yes", "No", "Unknown"],
      default: "Unknown",
    },
    osdsType: {
      type: String,
      enum: ["Cesspool", "Septic Tank", "Aerobic Unit", "Other", "Unknown"],
    },
    osdsTypeOtherValue: {
      type: String,
      default: "",
    },
    bestDayTimeForVisit: {
      type: String,
      default: "",
    },
    contactName: {
      type: String,
      default: "",
    },
    contactPhone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    mailingAddress: {
      type: String,
      default: "",
    },
    additionalNotes: {
      type: String,
      default: "",
    },
    coordinates: Object,
    images: {
      type: Array,
      default: [],
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
