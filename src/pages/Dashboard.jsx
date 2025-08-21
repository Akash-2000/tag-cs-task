import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";

import useFetchPosts from "../Hooks/useFetchPosts";
import { logOut } from "../redux/userSlice.js";

import PostsTable from "../components/PostsTable.jsx";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user.username);
  const dispatch = useDispatch();
  const { data, loading, error } = useFetchPosts();

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
          <Tooltip title="Logout" arrow>
            <IconButton size="large" onClick={handleLogout} disableFocusRipple>
              <LogoutIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <PostsTable data={data} loading={loading} error={error} />
    </Box>
  );
};

export default Dashboard;
