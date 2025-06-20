class Login {
    constructor(session) {
        this.session = session;
        this.users = [
            {
                username: "admin",
                email: "admin@example.com",
                password: "adminpass123"
            },
        ];
    }

    login(id, password) {
        // id can be either username or email
        const user = this.users.find(user =>
            (user.username === id || user.email === id) &&
            user.password === password
        );

        if (user) {
            this.session.setUser({ name: user.username });
            console.log(`Welcome ${user.username}!`);
            return true;
        }

    console.log("Invalid credentials");
    return false;
    }
}

export default Login;
