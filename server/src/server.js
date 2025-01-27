const http = require("http");
const app = require("./app");
const httpServer = http.createServer(app);
const dbConnect = require("./helpers/dbConfig");
const { PORT } = require("./lib/index");

const startServer = async () => {
  await dbConnect();
  httpServer.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
};

startServer();
