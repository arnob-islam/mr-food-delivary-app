import React, { useState } from "react";

import { Layout, Menu, Dropdown, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Box } from "@mui/material";
import { DownOutlined } from "@ant-design/icons";
import AddAdmin from "./AddAdmin";
// eslint-disable-next-line no-unused-vars
import { Link, useLocation } from "react-router-dom";

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

const Slider = ({ adminModel, setAdminModel }) => {
  const [collapsed, setCollapse] = useState({ collapsed: false });

  function onCollapse(collapsed) {
    setCollapse({ collapsed });
  }
  // const {pathname} = useLocation();
  // console.log(location);

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed.collapsed}
        onCollapse={onCollapse}
      >
        <div className="logo_admin ">
          <Box className="admin_logo_branding flex a-i-c">
            <img src="/image/slack.png" alt="" />
            {!collapsed.collapsed && <h2>My Admin</h2>}
          </Box>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            <Link to="/admin/dashbord">Dashbord</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            comming soon
          </Menu.Item>
          <SubMenu key="sub1" icon={<PieChartOutlined />} title="Food">
            <Menu.Item key="3">
              <Link to="/admin/dashbord/all/foods">All foods</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/dashbord/create/food ">Add Food</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>

      {adminModel && (
        <AddAdmin adminModel={adminModel} setAdminModel={setAdminModel} />
      )}
    </>
  );
};

export const AppHeader = ({ setAdminModel }) => {
  function handleMenuClick({ key }) {
    if (key === "1") {
      setAdminModel(true);
    }
  }

  const menu = (
    <Menu style={{ width: "9.5rem" }} onClick={handleMenuClick}>
      <Menu.Item key="1">Add Admin</Menu.Item>
      <Menu.Item key="3">Log out</Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Box
        className="admin_options flex a-i-c"
        sx={{ justifyContent: "flex-end" }}
      >
        <Box className="admin_more_option">
          <Dropdown overlay={menu}>
            <Button type="text">
              <DownOutlined size="large" />
            </Button>
          </Dropdown>
        </Box>
      </Box>
    </Header>
  );
};

export default Slider;
