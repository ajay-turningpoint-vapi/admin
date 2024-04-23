import React from "react";

const ExpandableComponent = ({ data }) => {
  console.log("Expanded Rows Data:", data); // Log the data prop
  return (
    <div>
      {/* Access props.data here */}
      {data.map((row, index) => (
        <div key={index}>
          {/* Render each row of the expanded content */}
          <span>{row.name}</span>
          {/* Add other fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default ExpandableComponent;
