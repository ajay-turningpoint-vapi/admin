import React, { useEffect, useState } from "react";
import AddBrandForm from "./AddBrandForm";
import { useSelector } from "react-redux";
function AddBrand() {
  const brandObj = useSelector((state) => state.brand.brandObj);
  console.log(brandObj);

  const [updatedObj, setUpdatedObj] = useState(null);

  useEffect(() => {
    if (brandObj) {
      setUpdatedObj(brandObj);
    }
  }, [brandObj]);

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          {updatedObj?._id ? <h5 className="blue-1 mb-4">Update Brand</h5> : <h5 className="blue-1 mb-4">Add New Brand</h5>}
          <AddBrandForm />
        </div>
      </section>
    </main>
  );
}

export default AddBrand;
