import React from "react";
import { images } from "../Images/Images";
import { DashboardBox } from "../Utility/DashboardBox";

function ShowBlog() {
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <DashboardBox className="blue-1">
            <h5 className="blue-1">Beauty Treatment</h5>
            <p className="fs-12">From Super Admin Fri, May 20, 2022 4:18 PM</p>
            <img src={images.product} alt="" className="my-4" />
            <p className="fs-14">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default ShowBlog;
