import React, { useEffect, useState } from "react";
import { createLead, editLeads } from "../../services/leads";

const LeadsForm = ({ leadToEdit = null, onSaved, onCancel }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("New");

  useEffect(() => {
    if (leadToEdit) {
      setFullName(leadToEdit.fullName || "");
      setPhone(leadToEdit.phone || "");
      setEmail(leadToEdit.email || "");
      setAddress(leadToEdit.address || "");
      setStatus(leadToEdit.status || "New");
    } else {
      setFullName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setStatus("New");
    }
  }, [leadToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim()) {
      alert("Full name and email are required.");
      return;
    }

    try {
      if (leadToEdit) {
        await editLeads(leadToEdit.id, { fullName, phone, email, address, status });
      } else {
        await createLead(fullName, phone, email, address, status);
      }

      onSaved?.();
    } catch (error) {
      console.error("Failed to save lead", error);
      alert("Unable to save lead right now.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Full Name</legend>
              <input
                type="text"
                className="input border rounded-lg"
                placeholder="Type here"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Phone Number</legend>
              <input
                type="text"
                className="input border rounded-lg"
                placeholder="Type here"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Address</legend>
              <input
                type="text"
                className="input border rounded-lg"
                placeholder="Type here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Address</legend>
              <input
                type="text"
                className="input border rounded-lg"
                placeholder="Type here"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </fieldset>
        <fieldset className="fieldset md:col-span-2">
          <legend className="fieldset-legend">Status</legend>
          <select
            className="select w-full border rounded-lg bg-gray-100"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Quoted">Quoted</option>
            <option value="Closed">Closed</option>
          </select>
        </fieldset>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-outline btn-primary rounded-lg bg-white"
        >
          {leadToEdit ? "Save Changes" : "Add Lead"}
        </button>
      </div>
    </form>
  );
};

export default LeadsForm;
