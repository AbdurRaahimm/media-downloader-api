import express from "express";
import cors from "cors";
import v1Routes from "./routes/v1/index.js";
import v2Routes from "./routes/v2/index.js";
import errorHandler from "./middleware/errorHandler.js";
import logger from "./middleware/logger.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(logger); // Logger middleware for request logging (Use before routes)

// Mount versioned routes
app.use("/api/v1", v1Routes);
app.use("/api/v2", v2Routes);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
