require('dotenv/config');

const app = require('./app');

app.listen(process.env.PORT || 3500, () => {
    console.info(`Server running on port ${process.env.PORT || 3500}`);
});
