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
  notice_number: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  original_loan_amount: { type: String, required: true },
  original_load_date: { type: String, required: true },
  estimated_value: { type: String, required: true },
  beneficiary: { type: String, required: true },
  sales_date: { type: String, required: true },
  owner: { type: String, required: true },
  status: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  property_status: { type: String, required: true },
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
