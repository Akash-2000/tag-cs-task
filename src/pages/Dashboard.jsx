import { Box, AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import useFetchPosts from "../Hooks/useFetchPosts";
import { logOut } from "../redux/userSlice.js";
import PostsTable from "../components/PostsTable.jsx";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user.username);
  const dispatch = useDispatch();
  const { data, loading, error } = useFetchPosts();
  console.log(data, loading, error);

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {user}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <PostsTable data={data} loading={loading} error={error} />
    </Box>
  );
};

export default Dashboard;
