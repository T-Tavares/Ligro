///////////////////////////////////////////////////////////
//                    DROPDOWN MENU                      //
///////////////////////////////////////////////////////////

// ENTER FOCUS MODE/MENU - DROPDOWN MENU CLICK
function dropdownMenu() {
    const menu = document.getElementById("dropdown")
    const menuItems = document.getElementById("dropdown-items")
    const menuFocus = document.getElementById("opacity-focus-id")

    menu.classList.toggle("zindex-21")
    menuItems.classList.toggle("dropdown-list")
    menuFocus.classList.toggle("opacity-focus-on")
}
// MENU EVENT LISTENER
const dropdownButton = document.getElementsByClassName("list-dropdown-button");
dropdownButton[0].addEventListener("onClick", dropdownMenu)

///////////////////////////////////////////////////////////
//                     NEW LIST BOX                      //
///////////////////////////////////////////////////////////
function newListFocus() {
    const newListBox = document.getElementById("new-list-box")
    const focus = document.getElementById("opacity-focus-id")
    focus.classList.toggle("opacity-focus-on")
    newListBox.classList.toggle("new-list-box-display")
}
const newList = document.getElementById("new-list-btn")
newList.addEventListener("click", newListFocus)



///////////////////////////////////////////////////////////
//            DELETE ALL ITEMS / DELETE LIST             //
///////////////////////////////////////////////////////////

// DELETE ALL FOCUS ON FUNCTION
function deleteAllFocus() {
    const deleteAllBox = document.getElementById("delete-all-box")
    const focus = document.getElementById("opacity-focus-id")
    focus.classList.toggle("opacity-focus-on")
    deleteAllBox.classList.replace("delete-all-box-off", "delete-all-box")
}


// DELETE ALL EVENT LISTENER
const deleteAll = document.getElementById("deleteAll-btn")
deleteAll.addEventListener("click", deleteAllFocus)


///////////////////////////////////////////////////////////
//          EXIT FOCUS MODE ON SCREEN CLICK              //
///////////////////////////////////////////////////////////

function exitOnScreenClick() {
    // GETTING DROPDOWN MENU 
    const menu = document.getElementById("dropdown")
    const menuItems = document.getElementById("dropdown-items")
    const isDropmenuOn = menuItems.classList.contains("dropdown-list")

    // GETTING DELETE ALL BOX
    const deleteAllBox = document.getElementById("delete-all-box")
    const isDeleteBoxOn = deleteAllBox.classList.contains("delete-all-box")

    // GETTING NEW LIST BOX
    const newListBox = document.getElementById("new-list-box")
    const isNewListBoxOn = newListBox.classList.contains("new-list-box-display")

//////////////////////////////////////////////////////

    // DROPDOWN MENU EXIT 
    if (!isDropmenuOn) {
        menuItems.classList.toggle("dropdown-list")
        menu.classList.toggle("zindex-21")
    }
    // DELETE ALL BOX EXIT
    if (isDeleteBoxOn) {
        deleteAllBox.classList.replace("delete-all-box", "delete-all-box-off")
    }

    if (!isNewListBoxOn) {
        newListBox.classList.toggle("new-list-box-display")
    }

    pageClickMenuOff.classList.toggle("opacity-focus-on")
}

// EXIT ON SCREEN CLICK EVENT LISTENER
const pageClickMenuOff = document.getElementById("opacity-focus-id")
pageClickMenuOff.addEventListener("click", exitOnScreenClick)


///////////////////////////////////////////////////////////
//                    FOCUS 100VH FIX                    //
///////////////////////////////////////////////////////////

// GET HEIGHT OF HTML
//https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript

// CREATE A VARIABLE OF IT 
//https://dev.to/nirazanbasnet/dont-use-100vh-for-mobile-responsive-3o97


const documentHeight = () => {
    
    let body = document.body;
    let html = document.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

    html.style.setProperty('--doc-height', `${height}px`)
}

window.addEventListener("resize", documentHeight)
documentHeight()
   