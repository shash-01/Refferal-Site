const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    company: {
      type: String,
      default: ""
    },

role: {
   type: String,
   default: ""
},

skills: [{
   type: String
}],

experience: [{
   company: String,
   role: String,
   duration: String
}],

education: [{
   college: String,
   degree: String,
   year: String
}],

resumeUrl: {
  type: String,
  default: ""
},

username: {
  type: String,
  unique: true,
  required: true,
},

profilePicture: {
  type: String,
  default: "",
},

bio: {
  type: String,
  default: "",
},

linkedinUrl: {
  type: String,
  default: "",
},

githubUrl: {
  type: String,
  default: "",
},

// resume: {
//   type: String,
//   default: "",
// },

followers: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
],

following: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
]

  },
  {
    timestamps: true
  }
);



module.exports = mongoose.model("User", userSchema);