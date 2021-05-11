const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    dateTime: {
      type: String,
      required: true,
    },
    recordNum: {
      type: Number,
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
