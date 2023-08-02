import "./navbar.scss";
import * as React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import Logo from "../../assets/logoweb.png";

function Navbar() {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { user, logout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>
            <img style={{ height: "35px" }} src={Logo} alt="" />
          </span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <img
              src={user.profile_img}
              alt=""
              style={{ width: 35, height: 35, borderRadius: "50%" }}
            />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <Link to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
            <MenuItem onClick={handleClose}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={user.profile_img}
                  alt=""
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <span>Perfil</span>
              </span>
            </MenuItem>
          </Link>
          <Divider />
          <MenuItem onClick={logout} as={Link} to="/auth">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Cerrar Sesión
          </MenuItem>
        </Menu>
        <div className="user">
          <span>{user.name}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
