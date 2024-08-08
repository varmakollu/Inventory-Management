import { Box, Button, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = (addItem, removeItem) => [
  { field: "id", headerName: "ID", flex: 0.05, hide: true, headerAlign: "center", align: "center" },
  { field: "category", headerName: "Category", flex: 0.3, headerAlign: "center", align: "center" },
  { field: "name", headerName: "Item Name", flex: 0.3, headerAlign: "center", align: "center" },
  { field: "quantity", headerName: "Quantity", type: "number", flex: 0.1, headerAlign: "center", align: "center" },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.25,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      const { name } = params.row;
      return (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              addItem(name);
            }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              removeItem(name);
            }}
          >
            Remove
          </Button>
        </Stack>
      );
    },
  },
];

const DataTable = ({ inventory, addItem, removeItem }) => {
  const rows = inventory.map((item, index) => ({
    id: index + 1,
    category: item.category,
    name: item.name,
    quantity: item.quantity,
  }));

  return (
    <Box width="100vw" height="100h" display="flex" justifyContent="center" alignItems="center">
      <Box width="80%" height={400}>
        <DataGrid
          rows={rows}
          columns={columns(addItem, removeItem)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </Box>
  );
};

export default DataTable;