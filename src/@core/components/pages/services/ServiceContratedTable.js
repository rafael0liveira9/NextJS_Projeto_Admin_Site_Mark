// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid";

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";
import QuickSearchToolbar from "src/views/table/data-grid/QuickSearchToolbar";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Data Import
import { rows } from "src/@fake-db/table/static-data";
import { regexMoney, regexMoneyText } from "src/utils/utils";
import { Button } from "@mui/material";
import { AiOutlineEdit, AiOutlineFolderView } from "react-icons/ai";
import Router from "next/router";

// ** renders client column
const renderClient = (params) => {
  const { row } = params;
  const stateNum = Math.floor(Math.random() * 6);
  const states = [
    "success",
    "error",
    "warning",
    "info",
    "primary",
    "secondary",
  ];
  const color = states[stateNum];
  // if (row.avatar.length) {
  //   return (
  //     <CustomAvatar
  //       src={`/images/avatars/${row.avatar}`}
  //       sx={{ mr: 3, width: "1.875rem", height: "1.875rem" }}
  //     />
  //   );
  // } else {
  //   return (
  //     <CustomAvatar
  //       skin="light"
  //       color={color}
  //       sx={{ mr: 3, fontSize: ".8rem", width: "1.875rem", height: "1.875rem" }}
  //     >
  //       {getInitials(row.full_name ? row.full_name : "John Doe")}
  //     </CustomAvatar>
  //   );
  // }
};

const statusObj = {
  1: { title: "current", color: "primary" },
  2: { title: "professional", color: "success" },
  3: { title: "rejected", color: "error" },
  4: { title: "resigned", color: "warning" },
  5: { title: "applied", color: "info" },
};

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const TableColumns = ({ rowsData, columns }) => {
  const [data] = useState(rowsData);
  const [pageSize, setPageSize] = useState(7);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        // @ts-ignore
        return searchRegex.test(row[field].toString());
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <Card>
      <DataGrid
        autoHeight
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}
        components={{ Toolbar: QuickSearchToolbar }}
        rows={filteredData.length ? filteredData : data}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        componentsProps={{
          baseButton: {
            variant: "outlined",
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(""),
            onChange: (event) => handleSearch(event.target.value),
          },
        }}
      />
    </Card>
  );
};

export default TableColumns;
