import React from "react";

function SearchBox( props ) {
  return (
    <div className="search-field">
      <form action="#" className="form">
        <div
          className={props.extraClass ? `input-group ${props.extraClass}` : "input-group"}
        >
          <div className="input-group-text">
            <i className="ion-ios-search-strong blue-1"></i>
          </div>
          <input type="text" className="form-control" placeholder="Search" />
        </div>
      </form>
    </div>
  );
}

export default SearchBox;
