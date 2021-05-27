import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

// if there IS info for the list in the browser's local storage, then return the list 
// this is done so we still have the list information even if we refresh the page...
const getLocalStorage = () =>{
  // "list" is the key for the key/value pair
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  // if there is NOT any list info in local storage, return an empty array
  else{
    return []
  }
}

function App() {
  // set up state values

  // state value for the form, default is empty...
  const [name, setName] = useState("");

  // state value for the list, default empty array...
  const [list, setList] = useState(getLocalStorage());

  // state value for the editing flag, default is false...
  const [isEditing, setIsEditing] = useState(false);

  // state value for which item we are editing, default set to NULL...
  const [editID, setEditID] = useState(null);

  // state value for the alert, default is set to an object (due to different values and properties for the alert)...
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  // set up a handleSubmit for the form, which looks for the event object...
  const handleSubmit = (e) => {
    e.preventDefault();
    // if the "name" is false (an empty string)...
    if (!name) {
      // display alert containing show:true, class:'danger', msg:'please enter value'...
      showAlert(true, "danger", "please enter value");
    }
    // else if name is true (not an empty string) AND isEditing is true...
    else if (name && isEditing) {
      // deal with edit
      // iterate over the "list" array...
      setList(list.map((item) =>{
        // if the item id matches the id of the item we are editing...
        if(item.id === editID){
          // return all the properties of that item, and change the title to whatever is the "name" state value right now...
          return{...item, title:name}
        }
        return item
      }))
      // this resets all the state values back to their defaults after the edit is completed
      setName('')
      setEditID(null)
      setIsEditing(false)
      // display an alert with these values...
      showAlert(true, 'success', 'value changed')
    } else {
      // display alert containing show:true, class:'success', msg:'item added to the list'...
      showAlert(true, 'success', 'item added to the list')
      // create the new item with the id and title (which is equal to the name state value)
      const newItem = { id: new Date().getTime().toString(), title: name };
      // once we have the new value, we take all the info from "list" and we tack on the newItem...
      setList([...list, newItem]);
      // then we set the name state value back to an empty string...
      setName("");
    }
  };

  // this keeps the list information in the browser local storage
  useEffect(() =>{
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  // lets set up a function that will contain all the alert properties so we can easily use them in outr handleSubmit function...
  const showAlert = (show = false, type = " ", msg = " ") => {
    setAlert({ show, type, msg });
  };

  // let's set up a function for the alert that will show when we clear the whole list, 
  // this alert contains show:true, class:'danger', msg:'empty list'...
  const clearList = () =>{
    showAlert(true, 'danger', 'empty list')
    // reset the list to an empty array...
    setList([])
  }

  // let's set up functionality for removing individual items based on it's ID...
  const removeItem = (id) =>{
    showAlert(true, 'danger', 'item removed')
    // return a new list, where only the items that DO NOT match the removed item's ID are included...
    setList(list.filter((item) => item.id !== id))
  }

  // set up a function to edit the individual item based on it's ID...
  const editItem = (id) =>{
    // if the item ID matches this item, return that item...
    const specificItem = list.find((item) => item.id === id)
    // set isEditing to TRUE...
    setIsEditing(true)
    // setEditID is equal to the ID that we are passing in...
    setEditID(id)
    // this displays the title of the item we are editing in the form field....
    setName(specificItem.title)
  }
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* this displays the alert, this says IF alert.show is TRUE, THEN display the <Alert /> component...*/}
        {/* we pass in all the properties from our "alert" state value... */}
        {/* the "list" prop is equal to our "list" state value */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            // value is set to the state value of "name" (default is empty)...
            value={name}
            // onChange looks for the event object and then sets the name to the new value that the user inputs...
            onChange={(e) => setName(e.target.value)}
          />
          {/* this says that IF isEditing is true, then have the button say 'edit', otherwise have the button say 'submit' (default)*/}
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {/* IF the list length is greater than 0, THEN display the <List /> component and the "clear items" button... */}
      {list.length > 0 && (
        <div className="grocery-container">
          {/* the "items" prop is equal to the list state value */}
          {/* the removeItem prop is equal to the removeItem function... */}
          <List items={list} removeItem={removeItem} editItem={editItem}/>
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
