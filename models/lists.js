import mongoose from "mongoose";
const {Schema, model} = mongoose


const listSchema = new Schema ({
    listName:  String,
})

const List = model("list", listSchema)

export default List
