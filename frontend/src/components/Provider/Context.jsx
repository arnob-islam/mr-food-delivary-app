import { useQuery } from "@apollo/client";
import React, { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_USER } from "../../Graphql/Query/User";
import { GET_ADMIN } from "../../Graphql/Query/AdminQuery";
import io from "socket.io-client";
const Context = createContext();

const socket = io.connect("/");

const GlobalContext = ({ children }) => {
  const { data, loading } = useQuery(GET_USER);
  const { data: adminData } = useQuery(GET_ADMIN);

  const dispatch = useDispatch();

  // user
  useEffect(() => {
    if (data) {
      if (data.user) {
        dispatch({ type: "AUTH_SUCCESS", payload: data.user.user });
      }
    }
  }, [loading, data, dispatch]);

  // admin
  useEffect(() => {
    if (adminData) {
      if (adminData) {
        dispatch({
          type: "ADMIN_AUTH_SUCCESS",
          payload: adminData.Admin.admin,
        });
      }
    }
  }, [loading, adminData, dispatch]);

  useEffect(() => {
    if (socket) {
      dispatch({
        type: "INITIALIZE_SOCKET",
        payload: socket,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Context.Provider value={{ loading }}>
      {!loading && children}
    </Context.Provider>
  );
};

export default GlobalContext;
