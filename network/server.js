import { BASE_URL } from './../utils/constants';
    
async function getTasks() {
    try {
        const response = await fetch(BASE_URL + '/tasks');
        const responseJSON = await response.json();
        return responseJSON;
    } catch(error) {
        console.log('error: ', error);
    }
}

export {getTasks};