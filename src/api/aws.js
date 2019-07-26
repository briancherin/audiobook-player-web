/* import AWS from 'aws-sdk';
import Auth from '@aws-amplify/auth';

let s3 = null;

let initialized = false;

export async function init() {
    Auth.currentCredentials()
    .then(credentials => {
        AWS.config.credentials = credentials; 
        s3 = new AWS.S3({apiVersion: '2006-03-01'});
        initialized = true;
    });
}

 */