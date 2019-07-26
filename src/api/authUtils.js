import Auth from '@aws-amplify/auth';

export async function getCredentials() {
    const credentials = await Auth.currentCredentials();
    return credentials;
}

export async function getCurrentUserId() {
    const { id } = await Auth.currentUserInfo();
    return id;
}