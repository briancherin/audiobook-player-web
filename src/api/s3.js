import AWS from 'aws-sdk';
import * as authUtils from './authUtils';

let s3 = null;
export let initialized = false;

const bucketName = "audiobook-player-files-audiobkenv";
let currentUserId = null;

init();

export async function init() {
    const credentials = await authUtils.getCredentials();
    AWS.config.credentials = credentials; 
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    initialized = true;
}


export async function putFile(fileName, file, contentType, onSuccess, onFailure) {
    const params = await getObjectParams(fileName, file);
    s3.putObject(params, function(err, data) {
        if (err) onFailure(err);
        else onSuccess(data)
    });
}

async function getObjectParams(fileName, file) {
    const bucketLocation = await getPrivateUserFolder();
    return(
        {
            Key: fileName,
            Body: file,
            Bucket: bucketName + "/" + bucketLocation,
            ACL: 'private'
        }
    );
}



//e.g. audiobook-player-files-audiobkenv/private/us-east-1:fd416e4a-29eb-41a3-9198-af4cdedc544c
async function getPrivateUserFolder() {
    const currentUserId = await getCurrentUserId();
    return "private/" + currentUserId;
}

async function getCurrentUserId() {
    if (currentUserId) return currentUserId;
    const { id } = await authUtils.getCurrentUserId();
    currentUserId = id; //Store for future use
    return id;
}