import React, { Component } from "react";
import logo from '../../assets/logo.png';
import styles from "./TopNav.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

export function TopNav() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    // <Row className="ml-auto">

    <AppBar position="static" style={{ background: "Black" }}>
      <Toolbar style={{ justifyContent: "center" }}>
      <img src={logo} className={styles.logo} alt='logo'/>
        <Link to="/">
          <Typography className={styles.item_style} variant="primary">
            Home
          </Typography>
        </Link>

        {!isAuthenticated && (
          <>
            <Link>
              <Typography
                className={styles.item_style}
                variant="primary"
                onClick={() => loginWithRedirect({})}
              >
                {" "}
                Log In / Sign Up
              </Typography>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link className={styles.item_style} to={"/product_upload/" + user.sub}>
              Post a new product
            </Link>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>

              <Typography className={styles.username_style} variant="primary">
                Hi, {user.nickname} !{" "}
              </Typography>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link to={"/user/" + user.sub}>
                    <Typography
                      className={styles.menuitem_style}
                      variant="primary"
                    >
                      {user.nickname}
                    </Typography>
                  </Link>
                </MenuItem>
               
                <MenuItem onClick={() => logout()} variant="danger">
                  <Typography
                    className={styles.menuitem_style}
                    variant="primary"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
