import React from "react";
import CloseIcon from "../../assets/close.png";

const LeadsForm = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-[4vh] w-100 rounded-lg bg-blue-200 shadow-2xl">
            <div className="pb-2px flex">
              <h1 className=" text-2xl font-bold mb-6 text-black">
                Add New Lead
              </h1>
              <img
                src={CloseIcon}
                alt="close icon"
                className="w-6 h-6 ml-auto cursor-pointer btn-ghost"
              />
            </div>
          <div className="p-[1vh]">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Full Name</legend>
              <input
                type="text"
                className="input border rounded-lg"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Phone Number</legend>
              <input
                type="text"
                className="input border rounded-lg"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Address</legend>
              <input
                type="text"
                className="input border rounded-lg"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Address</legend>
              <input
                type="text"
                className="input border rounded-lg"
                placeholder="Type here"
              />
            </fieldset>
          </div>
            <div className="p-[1vh] flex justify-end">
                <button className="btn btn-outline btn-primary rounded-lg bg-white">Add Lead</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default LeadsForm;
