function required(value) {
    return value ? undefined : 'This field cannot be empty';
}

function phone(value) {
    return /^\d*$/.test(value) ? undefined : 'This phone number is invalid';
}

function email(value) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(value) ? undefined : 'This email address is invalid';
}

export { required, email, phone };
export const validators = { required, email, phone };
