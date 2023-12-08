import React from "react";
import CreateMenuForm from "./CreateMenuForm";

function AddMenu() {
  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Create Menu</h5>
          <CreateMenuForm />
        </div>
      </section>
    </main>
  );
}

export default AddMenu;
