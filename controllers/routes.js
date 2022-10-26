/////////////////////////////////////////////////////////
// IMPORT DEPENDENCIES AND SETUP 
/////////////////////////////////////////////////////////

import express from "express"
import Item from "../models/item.js"
import List from "../models/lists.js"
// import { retrieveListID, retrieveItems, addDefaultItems, retrieveListOfLists, titleToString, stringToTitle, checkUncheckItem, selectAllToggle } from "../middleware/functions.js"
import * as func from "../middleware/functions.js"

const router = express.Router()

/////////////////////////////////////////////////////////
// GET ROUTE TO HOME (MY-TO-DO-LIST)
/////////////////////////////////////////////////////////

router.get("/", (req, res) => {        
    res.redirect("/my-to-do-list")
})


/////////////////////////////////////////////////////////
// GET ROUTE TO /LIGRO/:NEWLIST
/////////////////////////////////////////////////////////

router.get("/:newlist", (req, res) => {

    // DENY APPLE ICON-TOUCH AND FAVICON REQUESTS
    const blockedReqs = ["favicon.ico", "apple-touch-icon.png", "apple-touch-icon-precomposed.png" ]

    const checkingRequest = async () => {
        // RETRIEVE :newlist VARIABLE AND SET FOR DB NAME
        let listName = await func.titleToString(req.params.newlist)

        if (blockedReqs.includes(listName)) {
            res.redirect("/my-to-do-list")
        } else {
            await getList (listName)
        } 
    }

    const getList = async (list) => {
 
        // CHECK IF LIST DOC EXISTS
        if (!(await List.find({listName: list}).count() > 0)){
            // console.log(`A new list, ${list} has been created`);
            // await List.create({listName: list}) // CREATE LIST
        }

        // SET LIST NAME FOR A RENDER FORMAT (Title)
        const listTitle = await func.stringToTitle(list)

        //GET LIST ID -> THIS IS GOING TO BE USED TO QUERY, ADD AND REMOVE ITEMS FROM THE LIST.
        const listID = await func.retrieveListID(list) 


        // ADD DEFAULT ITEMS WHEN NO ITEM IS FOUND
        // if (await Item.find({listref: listID}).count() === 0) {
        //     await addDefaultItems(listID)
        // } 

        // GET ITEMS REFERENT TO THAT LIST
        const itemListDB = await func.retrieveItems(listID)
        // GET LIST NAMES AND TITLES AS JSON FORMAT 
        /* That's gonna be important on the index.ejs file on the loop that will render the list  titles and the list name(path) */
        const dropdownList = await func.retrieveListOfLists()        
 
        res.render("index.ejs", {dropdownList: dropdownList, listTitle: listTitle, currentListItems: itemListDB, newItemPost: list, listName: list })
        // VARIABLES DEFINETLY NEED A WORK TO BE NAMED IN A MORE CLEAR WAY
    }
    
    checkingRequest()

}); 


/////////////////////////////////////////////////////////
// ADD ITEM
/////////////////////////////////////////////////////////

router.post("/:newlist", (req, res) => {

    const addItem = async () => {
        const newListName = req.params.newlist
        const rawNewItem = await req.body.newItem
    
        // Check for blank/empty strings and null them 
        const blancStr = rawNewItem.replace(/\s/g, "")

        if (blancStr === "") {
            // pass
        } else { 
            const newItem = await func.stringToTitle(rawNewItem)
            const listID = await func.retrieveListID(newListName)
            Item.create({
                name: newItem, 
                listref: listID, 
                checkQuery: " ",
                uncheckQuery:" ",
                hideClass:"hide-checkbox"});
        }
        res.redirect("/" + newListName);
    }
    addItem()
})


/////////////////////////////////////////////////////////
// DELETE ITEM 
/////////////////////////////////////////////////////////

router.post("/:newlist/deleteItem", (req, res) => {

    const newListName = req.params.newlist

    const deleteItem = async () => {
        const itemID = await req.body.delete
        await Item.findByIdAndDelete(itemID)
        res.redirect("/" + newListName);
    }
    deleteItem()
})


/////////////////////////////////////////////////////////
// CHECKBOX POST -> CHECKED / UNCHECKED
/////////////////////////////////////////////////////////

router.post("/:newlist/checkItem", (req, res) => {
    const newListName = req.params.newlist

    const checkUncheckPost = async () => {
        const checkingItemID = await req.body.check
        const uncheckingItemID = await req.body.uncheck;
  
        await func.checkUncheckItem(uncheckingItemID, checkingItemID)
    }
    checkUncheckPost()

    res.redirect("/" + newListName);

})


/////////////////////////////////////////////////////////
// MORE OPTIONS REQUESTS
/////////////////////////////////////////////////////////

// SELECT ALL TOGGLE
router.post("/:newlist/selectAll", (req, res) => {
    const selectAll = async () => {
        const newListName = req.params.newlist
    
        // GETTING LIST AND ITEMS 
        const listID = await func.retrieveListID(newListName)
        const checkQuery = await func.retrieveItems(listID)

        await func.selectAllToggle(checkQuery, listID)

        res.redirect("/" + newListName)
    }
    selectAll()
})

// NEW LIST BOX
router.post("/:newlist/newListBox", (req, res) => {
    const newListName = func.titleToString(req.body.newList)
    
    newListName.then((result) => {
        func.createList(result)
    })
  
})

// DELETE ALL LIST ITEMS 
router.post("/:newlist/deleteAll", (req, res) => {
    const deleteAll = async () => {
        const newListName = req.params.newlist
    
        // GETTING LIST AND ITEMS 
        const listID = await func.retrieveListID(newListName)
        await Item.deleteMany({listref: listID})

        res.redirect("/" + newListName)
    }
    deleteAll()
}) 

// DELETE LIST 
router.post("/:newlist/deleteList", (req, res) => {
    const deleteList = async () => {
        const newListName = req.params.newlist
    
        // GETTING LIST AND ITEMS 
        const listID = await func.retrieveListID(newListName)

        await Item.deleteMany({listref: listID})
        await List.findByIdAndDelete(listID)

        res.redirect("/my-to-do-list")
    }
    deleteList()
}) 

/////////////////////////////////////////////////////////
// EXPORT ROUTER
/////////////////////////////////////////////////////////

export default router