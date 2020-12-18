const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());

const router = require('./api/index');
router(app);

app.listen(port, () => {
  console.log(`port ${port} OK`);
});
