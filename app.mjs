import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get("/reading-list/healthz", (_, res) => {
  return res.json({ status: "ok" });
});



app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500);
  res.json({ error: err.message });
});

app.use("*", (_, res) => {
  return res
    .status(404)
    .json({ error: "the requested resource does not exist on this server" });
});

export default app;
