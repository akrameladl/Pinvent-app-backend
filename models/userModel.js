const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add user name!"],
  },
  email: {
    type: String,
    required: [true, "Please add user E-mail !"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add Password !"],
    minLength: [6, "Password must be min  6 characters "],
  },
  photo: {
    type: String,
    required: [true, "Please add Photo !"],
    default:
      "https://www.seekpng.com/png/full/73-730482_existing-user-default-avatar.png",
  },
  phone: {
    type: String,
    default: "0020",
  },
  bio: {
    type: String,
    default: "bio",
    maxLength:[250 , "Bio must be not more than 250 characters !"]
  },
},{
  timestamps: true,
});

  // Encrypt password before save to database
  userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
      return next()

    }

    // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword =  await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next()
  })

const User =mongoose.model("User", userSchema);
module.exports = User