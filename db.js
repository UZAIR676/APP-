const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    };

    try {
        mongoose.connect(process.env.DB, connectionParams)
            .then(() => {
                console.log("Connected to the database successfully");
            })
            .catch((err) => {
                console.error("Error connecting to the database", err);
            });
    } catch (error) {
        console.error("Error in database connection:", error);
    }
};
