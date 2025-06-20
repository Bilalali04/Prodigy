class SignUp {
    constructor(login) {
        this.login = login;
    }

    register(username, email, password) {
        const exist = this.login.users.some(user =>
            user.username === username || user.email === email
        );

        if(exist) {
            console.log("Username or email is already registered");
            return false;
        }

        this.login.users.push({ username, email, password });
        console.log(`User '${username}' registered`);
        return true;
    }
}

export default SignUp;