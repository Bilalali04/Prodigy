class Logout {
    constructor(session) {
        this.session = session;
    }

    logout() {
        const user = this.session.getUser();
        if (user) {
            console.log(`Goodbye ${user.name}!`);
            this.session.clearUser();
        } else {
            console.log("No user is logged in");
        }
    }
}

export default Logout;