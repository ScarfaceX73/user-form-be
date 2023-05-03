const { ObjectId } = require("mongodb");
const mongo = require("../connect");

module.exports.createUser = async (req, res) => {
    try {
        const userDetails = {
            isDeleted: false,
            ...(req?.body ?? {}),
        };
        console.log(userDetails);
        await mongo.selectedDb.collection("users").insertOne(userDetails);
        res.status(200).send({ message: "user added" });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.getUser = async (req, res, next) => {
    try {
        const userData = await mongo.selectedDb
            .collection("users")
            .find({ isDeleted: false })
            .toArray();
        res.send(userData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

module.exports.updateUser = async (req, res, next) => {
    try {
        const updatedData = await mongo.selectedDb
            .collection("users")
            .findOneAndUpdate(
                { _id: ObjectId(req.params.userId) },
                { $set: { ...req.body } },
                { returnOriginal: true }
            );
        res.send(updatedData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

//It is not recommended to use delete function.
module.exports.deleteUser = async (req, res, next) => {
    try {
        const deletedData = await mongo.selectedDb
            .collection("users")
            .remove({ _id: ObjectId(req.params.userId) });
        res.send(deletedData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};