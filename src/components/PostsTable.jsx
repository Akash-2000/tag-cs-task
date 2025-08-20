import React, { useState, useMemo, useEffect } from "react";
import { Box, TextField, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
        label="Search posts..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataGrid
        rows={filteredRows}
        columns={columns}
        loading={loading}
        slots={{ loadingOverlay: LinearProgress }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default PostsTable;
