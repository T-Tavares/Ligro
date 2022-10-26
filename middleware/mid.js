import bodyParser from "body-parser"
import express from "express"

export default function (app) {
    app.use(express.static("public"))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(bodyParser.urlencoded({ extended: true}))
    app.set("view engine", "ejs")
} 