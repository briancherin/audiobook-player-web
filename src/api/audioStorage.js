import * as s3 from './s3';

export async function putAudioFile(fileName, file) {
    if(!s3.initialized) {
        await s3.init();
    }
    await s3.putFile(fileName, file, 'audio/m4b', result => console.log(result), err => console.log(err));
}