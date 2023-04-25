import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer, gql } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PubSub } from "graphql-subscriptions";
import { resolveSubsContext, resolveContext } from "./Context";
import router from "./routes";
import { EventResolvers } from "./resolvers";
import { PrismaClient } from "./generated/client";
import fileUpload from "express-fileupload";
export const pubSub = new PubSub();
const prisma = new PrismaClient();
export const startServer = async (options = { port: 4000 }) => {
  try {
    const { port } = options;
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    app.set("pubSub", pubSub);
    app.set("prisma", prisma);
    app.use((req, res, next) => {
      res.header("Content-Security-Policy", "frame-ancestors '*'");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      res.header("Access-Control-Request-Methods", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
    app.use("/api/v1", router);
    const httpServer = createServer(app);
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/graphql",
    });
    const schema = makeExecutableSchema({
      typeDefs: gql`
        type Bulkings {
          id: Int
          percentage: Float
          createdAt: String
          updatedAt: String
          BulkingsError: [BulkingsError]
        }

        type BulkingsError {
          id: Int
          error: String
        }

        type Query {
          hello: Boolean
        }

        type Subscription {
          Event(id: Int): Bulkings
        }
      `,
      resolvers: [EventResolvers],
    });
    const serverCleanup = useServer(
      {
        schema,
        context: (ctx: any, msg: any, args: any) =>
          resolveSubsContext(ctx, msg, args, pubSub, prisma),
      },
      wsServer
    );
    const apolloServer = new ApolloServer({
      schema,
      plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),
        // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
      context: (req) => resolveContext(req, pubSub, prisma),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/graphql" });

    const serverInfo = () => {
      httpServer.listen(options, () => {
        console.info(
          `🚀 Graphql Server ready at http://localhost:${port}${apolloServer.graphqlPath} \n`,
          `🚀 Rest Server ready at http://localhost:${port}/api/v1`
        );
      });
      return { server: httpServer };
    };
    const serverData = serverInfo();
    return serverData;
  } catch (error) {
    throw new Error("Error starting server: " + error);
  }
};

(async () => {
  await startServer();
})();
