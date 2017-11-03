var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var PatientSchema = new Schema({

   caretakerName: {
      type: String,
      trim: true,
      required: true
   },

   caretakerPhone: {
      type: String,
      unique: true,
      required: true
   },

   caretakerEmail: {
      type: String,
      unique: true,
      required: true,
      match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
   },

   patientName: {
      type: String,
      trim: true,
      required: true
   },

   patientPhone: {
      type: String,
      unique: true,
      required: true
   },

   patientAddress: {
      type: String,
      required: true
   },

   reminders: [
      {
      type: Schema.Types.ObjectId,
      ref: "Reminder"
      }
   ]
});
// This creates our model from the above schema, using mongoose's model method
var Patient = mongoose.model("Patient", PatientSchema);

// Export the Patient model
module.exports = Patient;