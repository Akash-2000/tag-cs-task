import React, { useState, useMemo, useEffect } from "react";
import { Box, TextField, LinearProgress, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

// for taking values based on the data
const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "userId", headerName: "User ID", width: 100 },
  { field: "title", headerName: "Title", flex: 1 },
];

const PostsTable = ({ data, loading, error }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pageSize, setPageSize] = useState(20);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // filter rows by search term
  const filteredRows = useMemo(() => {
    return data.filter((row) =>
      row.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [data, debouncedSearch]);

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <TextField
        placeholder="Search posts..."
        variant="outlined"
        margin="normal"
        sx={{
          margin: 2,
          width: "25%",
        }}
        value={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={{ height: 500, padding: "16px", width: "98%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          slots={{ loadingOverlay: LinearProgress }}
          disableRowSelectionOnClick
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
        />
      </div>
    </Box>
  );
};

export default PostsTable;
