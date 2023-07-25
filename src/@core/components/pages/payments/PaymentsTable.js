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
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

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

const TableColumns = ({ rowsData, onEdit, onView, onDelete }) => {
  const [data] = useState(rowsData);
  const [pageSize, setPageSize] = useState(7);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    {
      flex: 0.2,
      minWidth: 150,
      field: "order_id",
      headerName: "ID do Pedido",
      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {renderClient(params)}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                noWrap
                variant="body2"
                sx={{ color: "text.primary", fontWeight: 600 }}
              >
                {row.id}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "client",
      headerName: "Cliente",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.Client.name}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 50,
      headerName: "Valor do Pedido",
      field: "value",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          R${" "}
          {regexMoneyText(parseFloat(params.row.value).toFixed(2).toString())}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 120,
      headerName: "Documento",
      field: "document",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.Client.document}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 120,
      headerName: "Status de Pagamento",
      field: "status",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.status == "FINISHED_PAYMENT"
            ? <p style={{ color: "#16C100" }}>Pagamento Recebido</p>
            : params.row.status == "SENDED_TO_ASANA"
              ? <p>Enviado para Asana</p>
              : <p style={{ color: "#C13000" }}>Pagamento Pendente</p>}
        </Typography>
      ),
    },
    {
      flex: 0.125,
      field: "createdat",
      minWidth: 80,
      headerName: "Data do Pedido",
      renderCell: (params) => {
        const dueDate = new Date(Date.parse(params.row.createdAt));

        return (
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {params.row.createdAt
              ? `${dueDate.getDate()}/${dueDate.getMonth() + 1
              }/${dueDate.getFullYear()}`
              : "Sem Data"}
          </Typography>
        );
      },
    },
    {
      flex: 0.125,
      field: "details",
      minWidth: 80,
      headerName: "Detalhes",
      renderCell: (params) => {
        return (
          <Button onClick={() => onView(params.row)}>
            <AiOutlineEye></AiOutlineEye>
          </Button>
        );
      },
    },
    {
      flex: 0.125,
      field: "edit",
      minWidth: 80,
      headerName: "Editar",
      renderCell: (params) => {
        return (
          <Button onClick={() => onEdit()}>
            <AiOutlineEdit></AiOutlineEdit>
          </Button>
        );
      },
    },
    {
      flex: 0.125,
      field: "remove",
      minWidth: 80,
      headerName: "Remover",
      renderCell: (params) => {
        return (
          <Button onClick={() => onDelete()}>
            <AiOutlineDelete></AiOutlineDelete>
          </Button>
        );
      },
    },
  ];

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
