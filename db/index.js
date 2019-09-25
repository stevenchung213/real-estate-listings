require('dotenv').config();
const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

// connection

const mongoUri = process.env.DATABASE || `mongodb://localhost:27017/real-estate-listings`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => console.log(`mongoDB connected at ${mongoUri}`))
  .catch(err => console.log(err));


// schemas

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

UserSchema.pre('save', function (next) {
  let user = this;

// only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

// generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const PropertySchema = new mongoose.Schema({
  notice_number: String,
  notice_date: String,
  address: String,
  city: String,
  zip: Number,
  trustee_name: String,
  schedule_date: String,
  time: String,
  original_load_date: String,
  original_loan_amount: Number,
  openbid: String,
  estimated_value: Number,
  beneficiary: String,
  current_phone: String,
  sales_date: String,
  trustee_id: String,
  owner_name: String,
  owner_address: String,
  mailing_city: String,
  mailing_zip: Number,
  status: String,
  latitude: String,
  longitude: String,
  agents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const NoteSchema = new mongoose.Schema({
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true }
});

const Users = mongoose.model('User', UserSchema);
const Properties = mongoose.model('Property', PropertySchema);
const Notes = mongoose.model('Note', NoteSchema);

module.exports = {
  Users,
  Properties,
  Notes
};
