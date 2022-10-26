import mongoose from "mongoose"
const {Schema, model} = mongoose
import "./lists.js"


const itemSchema = {
    name: String,
    listref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "list"
    },
    checkQuery: String,
    uncheckQuery: String,
    hideClass: String
}
// TODO MAKE ONLY TWO OPTIONS FOR CHECKED FIELD => CHECKED OR UNCHECKED
const Item = model("item", itemSchema)

export default Item