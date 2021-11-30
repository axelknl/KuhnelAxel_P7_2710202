const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route')
const postRouter = require('./routes/post.route')
const helmet = require('helmet')

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

app.options("*", cors());

const port = Number(process.env.PORT || 3200);

app.use(helmet());

app.use('/api/user', userRouter);
app.use('/api/post/', postRouter);

app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

app.use(errorMiddleware);

app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app;