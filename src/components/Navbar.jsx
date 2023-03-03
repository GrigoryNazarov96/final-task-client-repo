import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { logout } from "../requests/authRequests";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const PrimarySearchAppBar = observer(
  ({ getIsDarkThemeInStorage, changeTheme }) => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [searchString, setSearchString] = React.useState("");

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleSearch = () => {
      navigate(`/search/${searchString}`);
    };

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMyAccountClick = () => {
      navigate(`/users/${user.user.id}`);
      handleMenuClose();
    };

    const handleLogout = async () => {
      await logout();
      user.setUser({});
      user.setIsAuth(false);
      handleMenuClose();
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {user.isAuth && (
          <MenuItem onClick={handleMyAccountClick}>My account</MenuItem>
        )}
        {user.isAuth ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
        )}
      </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={changeTheme}>
          <IconButton sx={{ mr: 1 }} color="inherit">
            {getIsDarkThemeInStorage() === "true" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <p>Change Theme</p>
        </MenuItem>
      </Menu>
    );

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", cursor: "pointer" } }}
              onClick={() => navigate("/")}
            >
              Final Task
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <Button sx={{ color: "white" }} onClick={handleSearch}>
                Search
              </Button>
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            {user.user.role === "admin" && (
              <Button
                sx={{ marginRight: "2%", color: "white" }}
                onClick={() => navigate("/admin")}
              >
                Admin Panel
              </Button>
            )}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton sx={{ mr: 1 }} onClick={changeTheme} color="inherit">
                {getIsDarkThemeInStorage() === "true" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
              {!user.isAuth && location.pathname !== "/login" ? (
                <Button
                  sx={{ color: "white" }}
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
              ) : (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  disabled={location.pathname === "/login"}
                >
                  <AccountCircle />
                </IconButton>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
  }
);

export default PrimarySearchAppBar;
