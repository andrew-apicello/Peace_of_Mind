const mongoose = require("mongoose");
const db = require("../db/models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/pills",
  {
    useMongoClient: true
  }
);

// const patientSeed = ({caretakerName: 'Steve', caretakerPhone: '19087631304', caretakerEmail: 'carvalho@gmail.com', patientName: 'Nicole', patientPhone: '19087631304', patientAddress: '210 Ross Place, Westfield, NJ 07090'});

// db.Patients
//   .remove({})
//   .then(() => db.Patients.collection.insert(patientSeed))
//   .then(data => {
//     console.log(data.insertedIds.length + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });


const reminderSeed = ({reminderTitle: 'Take Medication', dayToComplete: 'Friday', timeToComplete: '2:00', medicationDosage: 10, medicationRefillDate: '12/01/17', reminderMessage: 'Take your whatever pills'});

db.Reminders
  .remove({})
  .then(() => db.Reminders.collection.insert(reminderSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
});