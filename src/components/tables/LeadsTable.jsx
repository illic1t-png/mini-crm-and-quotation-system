import React from "react";

const LeadsTable = () => {
  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>cy.ganderton@example.com</td>
              <td>(555) 123-4567</td>
              <td>123 Main St, City, State 12345</td>
              <td>Lead</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>hart.hagerty@example.com</td>
              <td>(555) 987-6543</td>
              <td>456 Oak Ave, City, State 12345</td>
              <td>Lead</td>
            </tr>
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>brice.swyre@example.com</td>
              <td>(555) 555-5555</td>
              <td>789 Pine Rd, City, State 12345</td>
              <td>Lead</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeadsTable;
