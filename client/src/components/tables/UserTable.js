import React from "react";

// Material UI Components
import { DataGrid, GridToolbar } from "@material-ui/data-grid";

const UserTable = ({ users, total, load }) => {
  let newUsersArr = [];
  for (let i = 0; i < users.length; i++) {
    newUsersArr.push({
      id: i + 1,
      picture: users[i].avatar,
      name: users[i].name,
      email: users[i].email,
      phone: users[i].phone,
      address: users[i].address,
    });
  }

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "picture",
      headerName: "Picture",
      width: 130,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 140,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
  ];

  const rows = newUsersArr;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        loading={load}
        rows={rows}
        columns={columns}
        pagination
        pageSize={10}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection
      />
    </div>
  );
};

export default UserTable;
