import React, { useState } from "react";
import Slider from "../Navbar/Slider";
import { AppHeader } from "../Navbar/Slider";
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import DashbordLanding from "./DashbordLanding";

const { Content } = Layout;

const Deshbord = () => {
  const [adminModel, setAdminModel] = useState(false);

  const { pathname } = useLocation();

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Slider adminModel={adminModel} setAdminModel={setAdminModel} />
        <Layout className="site-layout">
          <AppHeader setAdminModel={setAdminModel} />
          <Content>
            {pathname === "/admin/dashbord" ? <DashbordLanding /> : <Outlet />}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Deshbord;
