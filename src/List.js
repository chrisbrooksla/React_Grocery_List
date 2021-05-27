import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
// pass in the "items" prop from our <List/> component in App.js...
const List = ({items, removeItem, editItem}) => {
  return <div className="grocery-list">
    {/* map through the items array */}
    {items.map((item) =>{
      // deconstruct item for id and title...
      const{id, title} = item;
      // return an article with the title and 2 buttons ("edit" and "delete")...
      return <article key={id} className="grocery-item">
        <p className="title">{title}</p>
        <div className="btn-container">
          <button type="button" className="edit-btn" onClick={() => editItem(id)}>
            <FaEdit />
          </button>
          <button className="delete-btn" onClick={() => removeItem(id)}>
            <FaTrash  />
          </button>
        </div>
      </article>
    })}
  </div>
}

export default List
