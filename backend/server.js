/*
author: Arnob Islam
date: '14-12-21' 
description: ''
*/

const app = require("./app");
const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const jwt = require("jsonwebtoken");
const typeDefs = require("./Graphql/TypeDefs/app");
const resolvers = require("./Graphql/Resolvers/app");
const SocketIo = require("./controllers/Socket.io");

const PORT = process.env.PORT || 5000;

const getStarted = async () => {
  try {
    const httpServer = createServer(app);

    const getUser = (token, secret) => {
      try {
        if (token) {
          return jwt.verify(token, secret);
        }
        return null;
      } catch (err) {
        return null;
      }
    };

    const server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers,
      context: ({ req, res }) => {
        const token = req.cookies.token || "";
        const adminToken = req.cookies.adminToken || "";

        const riderToken = req.cookies.riderToken || "";
        const user = getUser(token, process.env.JWT_SECRET_KEY);
        const admin = getUser(adminToken, process.env.ADMIN_JWT_SECRET);
        const rider = getUser(riderToken, process.env.RIDER_JWT_SECRET);

        return { req, res, user, admin, rider };
      },
    });

    await server.start();
    server.applyMiddleware({
      app,
      // in playground make sure corse is false
      // cors: false,

      // in react or client, make sure corse is this
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    const getServer = httpServer.listen(PORT, () =>
      console.log("server is running on port ", +PORT)
    );
    SocketIo(getServer);
  } catch (error) {
    throw new Error(error.message);
  }
};

getStarted();
