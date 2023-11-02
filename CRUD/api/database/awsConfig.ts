import AWS from "aws-sdk"
import uuid from "uuid"

AWS.config.getCredentials((err) => {
    if (err) console.log(err.stack)
    else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
})
