const validation = {
    email: {
        empty: {
            message: 'Email should not be empty!'
        },
        incorrect: {
            message: 'Invalid email!'
        },
        wrong: {
            message: 'Email is invalid or this user doesnot exist!'
        },
        alreadyInUse: {
            message: 'Email is already in use!'
        }
    },
    password: {
        empty: {
            message: 'Password should not be empty!'
        },
        incorrect: {
            message: 'Password should be at least 6 characters!'
        },
        wrong: {
            message: 'Password is invalid or user does not have a password!'
        }
    },
    textFields: {
        empty: {
            message: 'Should not be empty!'
        },
        incorrect: {
            message: ''
        }
    }
};

export default validation;