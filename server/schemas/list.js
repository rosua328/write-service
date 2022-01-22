const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { Types: {ObjectId} } = Schema;

const listSchema = new Schema({
    writer : {
        type: ObjectId,
        required : true,
        ref: "User"
    },
    nickname:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const List = mongoose.model('List', listSchema);
module.exports = List;
