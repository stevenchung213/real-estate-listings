require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

// connection
const mongoUri = process.env.DATABASE || 'mongodb://localhost:27017/real-estate-listings';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then(() => console.log(`mongoDB connected at ${mongoUri}`))
  .catch(err => console.log(err));


// schemas
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
});

UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const PropertySchema = new mongoose.Schema({
  notice_number: { type: Number, index: { unique: true } },
  notice_date: { type: String },
  property_address: { type: String, required: true, index: { unique: true } },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  trustee_name: { type: String },
  schedule_date: { type: String },
  time: { type: String },
  original_load_date: { type: String },
  original_loan_amount: { type: Number },
  estimated_value: { type: Number },
  open_bid: { type: Number },
  beneficiary: { type: String },
  current_phone: { type: String },
  sales_date: { type: String },
  trustee_id: { type: Number },
  owner_name: { type: String, required: true },
  owner_address: { type: String },
  mailing_city: { type: String },
  mailing_zip: { type: Number },
  status: { type: String },
  spanish: { type: Boolean },
  lat: { type: Number },
  long: { type: Number },  agents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const NoteSchema = new mongoose.Schema({
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
});

const Users = mongoose.model('User', UserSchema);
const Properties = mongoose.model('Property', PropertySchema);
const Notes = mongoose.model('Note', NoteSchema);

module.exports = {
  Users,
  Properties,
  Notes,
};
