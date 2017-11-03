var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var RemindersSchema = new Schema({

  reminderTitle: {
    type: String,
    trim: true
  },

  dayToComplete: {
    type: String
  },

  timeToComplete: {
    type: String
  },

  medicationQuantity: {
    type: Number
  },

  medicationRefillDate: {
    type: Date
  },
  
  reminderMessage: {
    type: String,
    required: true
  },

  reminderImage: {
  	type: String
  },

  reminderCompleted: {
    type: Boolean,
    default: false
  },

   reminderLate: {
   	 type: Boolean,
   	 default: false
   }
});

// This creates our model from the above schema, using mongoose's model method
var Reminders = mongoose.model("Reminders", RemindersSchema);

// Export the Reminder model
module.exports = Reminders;