const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

module.exports = {
    selectedDb: {},
    async connect() {
        try {
            const url = encodeURI(process.env.MONGODB_URL ?? "");
            const client = new MongoClient(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1,
            });
            await client.connect();
            this.selectedDb = client.db("userData");
        } catch (err) {
            console.error(err);
        }
    },
};