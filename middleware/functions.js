/////////////////////////////////////////////////////////
// IMPORT DEPENDENCIES 
/////////////////////////////////////////////////////////

import Item from "../models/item.js"
import List from "../models/lists.js"


// CLEANING NEW LIST CHARACTERS FOR DATABASE 
// Swap " " for "-"
export async function titleToString (string) {
    const clearSpaces = string.replace(/ /g, "-") // https://www.designcise.com/web/tutorial/how-to-fix-replaceall-is-not-a-function-javascript-error
    const lowerCase = clearSpaces.toLowerCase()
    return lowerCase
}

// MAKING DB STRING SET TO RENDER
// Swap "-" for " " and Capitalize first letter of each word
export async function stringToTitle (string) {
    const spacesBack = string.replace(/-/g, "  ")
    const splitedString = spacesBack.split(" ")

    const capsString = [] // UpperCase first letter on each word
    for (let i = 0; i < splitedString.length; i++) {

        // need this if statement to avoid crash in case theres an empty string on the beginning of the item added - this if statement will ignore empty spaces on the beginning of the string //
        
        if (splitedString[i][0] !== undefined) {
            capsString[i] = splitedString[i][0].toUpperCase() + splitedString[i].slice(1)
        } 
    }

    // Array to String
    const titleString = capsString.join(" ")
    return titleString
}

//CREATE LIST 
export async function createList (listName) {
    const list = titleToString(listName)
    await List.create({listName: list})
    console.log(`"${listName}" : Has been created`);
}

// RETRIEVE AND SAVE MAIN LIST OBJECT ID
export async function retrieveListID (list) {
    const listIDSearch = await List.find({ listName: list })
    const listID = listIDSearch[0]._id.toString()
    return listID
};

// RETRIEVE LIST OF LISTS
export async function retrieveListOfLists () {
    const dropdownList = []
    const listQuery = await List.find({})
    for (let i=0; i < listQuery.length; i++) {
        const query = listQuery[i].listName
        dropdownList[i] = {
            listName: query,
            listTitle: await stringToTitle(query)
        }
    }
    return dropdownList
}


// RETRIEVE ITEMS LINKED TO THIS LIST ID
export async function retrieveItems (listID) {
    const itemsSearch = await Item.find({ listref: listID })
    return itemsSearch
};

// ADD DEFAULT ITEMS TO THE LIST
export async function addDefaultItems (listID) {
    await Item.create({
        name:"Press (+) to ADD an Item",
        listref: listID,
        checkQuery: " ",
        hideClass: "hide-checkbox" 
        },{
        name: "<----- Mark  DONE Items",
        listref: listID,
        checkQuery: " ",
        hideClass: "hide-checkbox" 
        },{
        name:"Delete an Item --------->",
        listref: listID,
        checkQuery: " ",
        hideClass: "hide-checkbox"
    })
}


//  CHECK UNCHECK INDIVIDUAL ITENS ON THE LIST
export async function checkUncheckItem (uncheckID, checkedID, listName) {
    /* CHECKBOX POST REQUESTS ONLY RECEIVE DATA FROM CHECKED BOXES
    For that if I used two boxes to create a logic for a check or unchecked item

    IF uncheckedQuery ID === UNDEFINED (Check Item Logic)
        checkQuery [ ]  uncheckQuery [ ] -> Initial State 
                  CLICK
        checkQuery [x]  uncheckQuery [ ] -> 
        
    IF both IDS === TRUE (Uncheck Items Logic)
        checkQuery [x]  uncheckQuery [ ] -> Uncheck Initial State
                                    CLICK
        checkQuery [x]  uncheckQuery [x] -> 
                                            
        checkQuery [ ]  uncheckQuery [ ] -> back to Initial State           
    */
    // CHECK ITEM LOGIG
    if (await uncheckID === undefined) {
        await Item.findByIdAndUpdate(checkedID, {
            checkQuery: "checked", 
            uncheckQuery:" ", 
            hideClass:""
        })
    } 
    // UNCHECK ITEM LOGIC
    if (uncheckID !== undefined && checkedID !== undefined) {
        await Item.findByIdAndUpdate(checkedID, {
            checkQuery: " ", 
            uncheckQuery:" ", 
            hideClass:"hide-checkbox"
        })
    }
}

// SELECT ALL TOGGLE
export async function selectAllToggle(Query, ID) {

    // CHECKING TOGGLE LOGIC
    let count = 0
    let checkCount = 0

    for (count; count < Query.length; count++) {
        if (Query[count].checkQuery === "checked" ) {
            checkCount ++
        }
    }
    // uncheck all
    if (count === checkCount) {
        await Item.updateMany({listref: ID}, {$set: {checkQuery: "", hideClass:"hide-checkbox"}})
    // check all
    } else { 
        await Item.updateMany({listref: ID}, {$set: {checkQuery: "checked", hideClass:""}})
    }
}
