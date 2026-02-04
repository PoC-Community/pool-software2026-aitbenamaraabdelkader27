const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(morgan('dev'));
app.use(cors());


app.get('/', (req, res) => {
  res.send("Hello world!" + req.CustomValue);
});
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

