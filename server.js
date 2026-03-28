import express from "express";
import postsRoutes from "./routes/posts.js";

  const app = express();
  const PORT = 3000;

  app.use(express.json())



  // USE ROUTES
  app.use("/api/posts", postsRoutes);

  app.get("/", (req, res) => {
     res.send("Welcome to Blog API");
    });

  app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
     });


