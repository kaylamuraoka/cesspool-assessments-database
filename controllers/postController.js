const Posts = require("../models/postModel");
const Comments = require("../models/commentModel");
const Users = require("../models/userModel");
const fetch = require("node-fetch");

// Filtering, sorting, and paginating
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    // gte = greater than or equal to
    // lte = less than or equal to
    // lt = less than
    // gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const postController = {
  createPost: async (req, res) => {
    try {
      const {
        dateTime,
        TMK,
        location,
        propertyOwner,
        propertyOwnerPhone,
        propertyOwnerEmail,
        projectAddress,
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
        images,
      } = req.body;

      if (
        !dateTime ||
        !location ||
        !projectAddress ||
        !engineer ||
        !contractor ||
        !weather ||
        !lotOccupied
      )
        return res.status(400).json({ msg: "Please fill in all fields." });

      const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${projectAddress.replace(
        /\s/g,
        "+"
      )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

      let coordinates = {};
      await fetch(geocodingUrl)
        .then((res) => res.json())
        .then((data) => {
          coordinates = data.results[0].geometry.location;
        });

      const newPost = new Posts({
        dateTime,
        TMK,
        location,
        propertyOwner,
        propertyOwnerPhone,
        propertyOwnerEmail,
        projectAddress,
        engineer,
        contractor,
        weather,
        contractor,
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
        coordinates,
        images,
        user: req.user._id,
      });

      await newPost.save();

      res.json({
        msg: "Created Post!",
        newPost: {
          ...newPost._doc,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Posts.find({
          user: [...req.user.following, req.user._id],
        }),
        req.query
      ).paginating();

      const posts = await features.query
        .sort("-createdAt")
        .populate("user likes", "avatar name email followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json({ msg: "Success!", result: posts.length, posts });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const {
        dateTime,
        TMK,
        location,
        propertyOwner,
        propertyOwnerPhone,
        propertyOwnerEmail,
        projectAddress,
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
        images,
      } = req.body;

      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          dateTime,
          TMK,
          location,
          propertyOwner,
          propertyOwnerPhone,
          propertyOwnerEmail,
          projectAddress,
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
          images,
        }
      )
        .populate("user likes", "avatar name email")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json({
        msg: "Updated Post!",
        newPost: {
          ...post._doc,
          dateTime,
          TMK,
          location,
          propertyOwner,
          propertyOwnerPhone,
          propertyOwnerEmail,
          projectAddress,
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
          images,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Posts.find({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (post.length > 0)
        return res
          .status(400)
          .json({ msg: "You have already liked this post." });

      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "This post does not exist." });

      res.json({ msg: "Liked Post!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unlikePost: async (req, res) => {
    try {
      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "This post does not exist." });

      res.json({ msg: "Unliked Post!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Posts.find({ user: req.params.id }),
        req.query
      ).paginating();

      const posts = await features.query.sort("-createdAt");

      res.json({
        posts,
        result: posts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id)
        .populate("user likes", "avatar name email followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      if (!post)
        return res.status(400).json({ msg: "This post does not exist." });

      res.json({ post });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPostsDiscover: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 9;

      const posts = await Posts.aggregate([
        { $match: { user: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
      ]);

      return res.json({
        msg: "Success!",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Posts.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

      await Comments.deleteMany({ _id: { $in: post.comments } });

      res.json({
        msg: "Deleted Post!",
        newPost: {
          ...post,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  savePost: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.user._id,
        saved: req.params.id,
      });

      if (user.length > 0)
        return res
          .status(400)
          .json({ msg: "You have already saved this post." });

      const save = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { saved: req.params.id },
        },
        { new: true }
      );

      if (!save)
        return res.status(400).json({ msg: "This user does not exist." });

      res.json({ msg: "Saved Post!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unsavePost: async (req, res) => {
    try {
      const save = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { saved: req.params.id },
        },
        { new: true }
      );

      if (!save)
        return res.status(400).json({ msg: "This user does not exist." });

      res.json({ msg: "Unsaved Post!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getSavePosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Posts.find({ _id: { $in: req.user.saved } }),
        req.query
      ).paginating();

      const savePosts = await features.query.sort("-createdAt");

      res.json({
        savePosts,
        result: savePosts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const features = new APIfeatures(Posts.find(), req.query)
        .filtering()
        .paginating();

      const posts = await features.query
        .sort("-createdAt")
        .populate("user likes", "avatar name email followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json({
        msg: "Success!",
        result: posts.length,
        total: totalRecords,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

// Functions to validate user input
function validateEmail(email) {
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

module.exports = postController;
