import SignUp from './SignUp';

describe('SignUp.register', () => {
    let loginSystem;
    let signup;

    beforeEach(() => {
        loginSystem = { users: [] };
        signup = new SignUp(loginSystem);
    });

    test('Test case 1: Valid username, email, password', () => {
        const result = signup.register("JohnDoe", "john.doe@example.com", "Password123!");
        expect(result).toBe(true);
    });

    test('Test case 2: Invalid username (contains @)', () => {
        const result = signup.register("johndoe@900", "john.doe@example.com", "Password123!");
        expect(result).toBe(false);
    });

    test('Test case 3: Invalid email (missing @)', () => {
        const result = signup.register("JohnDoe", "johndoe_example.com", "Password123!");
        expect(result).toBe(false);
    });

    test('Test case 4: Invalid password (too short)', () => {
        const result = signup.register("JohnDoe", "john.doe@example.com", "pw123");
        expect(result).toBe(false);
    });

    test('Test case 5: Exceptional username (empty string)', () => {
        const result = signup.register("", "john.doe@example.com", "Password123!");
        expect(result).toBe(false);
    });

    test('Test case 6: Exceptional email (contains #)', () => {
        const result = signup.register("JohnDoe", "johndoe#example.com", "Password123!");
        expect(result).toBe(false);
    });

    test('Test case 7: Exceptional password (very short)', () => {
        const result = signup.register("JohnDoe", "john.doe@example.com", "p");
        expect(result).toBe(false);
    });
});
