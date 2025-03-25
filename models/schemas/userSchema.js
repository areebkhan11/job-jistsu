const { Schema, model } = require("mongoose");
const { ROLES, ROLES_TYPE } = require("../../utils/constants");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new Schema(
  {
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, default: null },
    badgeId: { type: String, default: null },
    parentId: { type: Schema.Types.ObjectId, ref: "User" },
    phone: { type: String, required: true, unique: true },
    image: { type: String, default: null },
    role: { type: String, default: ROLES.USER, enum: Object.values(ROLES) },
    roleType: { type: String, enum: Object.values(ROLES_TYPE) },
    positionName: { type: String, default: null },
    fcmToken: { type: String, default: null, select: false },
    resetPasswordToken: { type: String, default: null, select: false },
    isActive: { type: Boolean, default: true },
    shifts: { type: [String], default: null },
    isDeleted: { type: Boolean, default: false },
    location: { type: String, default: null },
    online: { type: Boolean, default: false },

    // New fields
    age: { type: Number, default: null },
    bio: { type: String, default: null },
    discipline: { type: String, default: null },
    education: { type: String, default: null },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    goals: { type: String, default: null },
    hobbies: { type: String, default: null },
    isFelony: { type: String, enum: ["yes", "no"], default: "no" },
    isVeteran: { type: String, enum: ["yes", "no"], default: "no" },
    locationName: { type: String, default: null },
  },
  { timestamps: true, versionKey: false }
);

userSchema.plugin(mongoosePaginate);
userSchema.plugin(aggregatePaginate);

const UserModel = model("User", userSchema);

module.exports = UserModel;
