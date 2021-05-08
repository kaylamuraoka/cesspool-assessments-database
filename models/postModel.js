const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    dateTime: {
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
      type: Array,
      default: [
        {
          dry: false,
          wet_water_scum: false,
          wet_sludge: false,
          odorous: false,
          unknown: false,
        },
      ],
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
      type: Array,
      default: [],
    },
    osdsLocationOtherValue: {
      type: String,
      default: "",
    },
    rightOfEntryIssue: {
      type: Array,
      default: [],
    },
    rightOfEntryIssueOtherValue: {
      type: String,
      default: "",
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
