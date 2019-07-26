import AWS from 'aws-sdk';
import Auth from '@aws-amplify/auth';

let s3 = null;
let initialized = false;

const bucketName = "audiobook-player-files-audiobkenv";

init();

export async function init() {
    const credentials = await Auth.currentCredentials();
    // .then(credentials => {
    AWS.config.credentials = credentials; 
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    initialized = true;
    console.log("initialized aws")
    // });
}

export async function putAudioFile(fileName, file) {
    if(!initialized) {
        await init();
    }
    await putFile(fileName, file, 'audio/m4b', result => console.log(result), err => console.log(err));
}

async function putFile(fileName, file, contentType, onSuccess, onFailure) {
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

//TODO: Add memoization
async function getCurrentUserId() {
    const { id } = await Auth.currentUserInfo();
    return id;
}