import AWS from 'aws-sdk';
import downloader from 's3-download-stream';
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


export async function getFileStream(fileKey) {
    const params =await getGetFileParams(fileKey);
    console.log(params)
    const config = {
        client: s3,
        concurrency: 3,
        chunkSize: null,
        params: await getGetFileParams(fileKey)
    }
    const stream = downloader(config)
    stream.on('data', d => console.log(d))
    stream.on('httpHeaders', h => console.log(h))
    stream.on('closed', () => console.log("STREAM CLOSED"))
    return stream;
} 

export async function getFile(fileKey) {
    const params = await getGetFileParams(fileKey);
    return new Promise(function(resolve, reject) {
        s3.getObject(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    })
}

export async function deleteFile(fileKey) {
    const params = await getDeleteFileParams(fileKey);
    return new Promise(function(resolve, reject) {
        s3.deleteObject(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        })
    });
}

export async function listFileKeys() {
    return new Promise(function (resolve, reject) {
        listFiles()
        .then(data => {
            const keys = data.Contents.map(item => item.Key);
            const keysNoPrefix = removePrefixFromKeys(keys);
            resolve(keysNoPrefix);
        })
        .catch(e => {
            reject(e);
        })
    });
}

export async function listFiles() {
    const params = await getListFilesParams();
    return new Promise(function(resolve, reject) {
        s3.listObjects(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

export async function putFile(fileName, file, contentType) {
    const params = await getPutFileParams(fileName, file);
    
    return new Promise(function(resolve, reject) {
        s3.putObject(params, function(err, data) {
            if (err) {reject(err); console.log("in s3.js. error", err)}
            else {resolve(data);}
        });
    });
    
    
}

async function removePrefixFromKeys(keys) {
    const prefix = await getPrivateUserFolder() + "/";
    return keys.map(key => key.split(prefix)[1]);
}

async function getGetFileParams(fileKey) {
    return(
        {
            Bucket: bucketName,
            Key: await getPrivateUserFolder() + "/" + fileKey
        }
    );
}

async function getListFilesParams() {
    return(
        {
            Bucket: bucketName,
            Prefix: await getPrivateUserFolder() + "/"
        }
    );
}

async function getPutFileParams(fileName, file) {
    const bucketLocation = await getPrivateUserBucket();
    return(
        {
            Key: fileName,
            Body: file,
            Bucket: bucketLocation,
            ACL: 'private'
        }
    );
}

async function getDeleteFileParams(fileKey) {
    return(
        {
            Bucket: bucketName,
            Key: await getPrivateUserFolder() + "/" + fileKey
        }
    );
}




//e.g. audiobook-player-files-audiobkenv/private/us-east-1:fd416e4a-29eb-41a3-9198-af4cdedc544c
async function getPrivateUserBucket() {
    const privateUserFolder = await getPrivateUserFolder();
    return bucketName + "/" + privateUserFolder;
}

async function getPrivateUserFolder() {
    const currentUserId = await getCurrentUserId();
    return "private/" + currentUserId;
}

async function getCurrentUserId() {
    if (currentUserId) return currentUserId;
    const id = await authUtils.getCurrentUserId();
    currentUserId = id; //Store for future use
    return id;
}