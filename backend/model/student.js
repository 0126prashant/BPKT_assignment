const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  major: { type: String, required: true },
  address: { type: String, required: true },
  enrollmentDate: { type: String, required: true },
},
{
    versionKey : false
});
const StudentModel = mongoose.model("student", studentSchema);

module.exports = StudentModel;