import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { LOG_OUT } from "../../Graphql/Query/User";
import { useLazyQuery } from "@apollo/client";

export default function AppHeader() {
  const { user } = useSelector((state) => state.UserReducer);

  const [LogOut, { data }] = useLazyQuery(LOG_OUT);

  function handleMenuClick(e) {
    return;
  }

  useEffect(() => {
    if (data) {
      if (data.logout.success) {
        window.location = "/";
      }
    }
  }, [data]);

  const menu = (
    <Menu onClick={handleMenuClick} style={{ width: "9.5rem" }}>
      <Menu.Item key="1">
        <Link to="/active/orders">Active Orders</Link>
      </Menu.Item>

      <Menu.Item key="3" onClick={() => LogOut()}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="app_header border-bottom"
        style={{
          background: "#15202c",
          color: "white",
          borderBottom: "1px solid rgb(54 56 58)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            className="logo__branding"
          >
            <Link to="/" className="nav_home_link">
              Mr FoodRest
            </Link>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "block", sm: "none" } }}
            className="mobile_img logo__branding"
          >
            <Link to="/" className="nav_home_link">
              <img src="/image/slack.png" alt="logo" />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {Object.keys(user).length !== 0 && (
            <Box sx={{ mr: 4 }}>
              <Link to="/user/profile" className="user_profile_link">
                <Box
                  className="user_profile flex"
                  sx={{ gap: 1, p: "4px", pr: 1 }}
                >
                  <div className="user_profile profile_image">
                    <Avatar
                      size="small"
                      src={user.photoUrl}
                      icon={<UserOutlined />}
                    />
                  </div>
                  <div className="user_name">
                    <span className="user_name">{user.firstName}</span>
                  </div>
                </Box>
              </Link>
            </Box>
          )}

          <Box>
            {Object.keys(user).length !== 0 ? (
              <Box className="more_option">
                <Dropdown overlay={menu}>
                  <Button type="text">
                    <DownOutlined size="large" />
                  </Button>
                </Dropdown>
              </Box>
            ) : (
              <Box className="login_">
                <Button
                  className="login_button_nav"
                  type="link"
                  icon={<UserOutlined />}
                >
                  <Link to="/user/login">Login</Link>
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
