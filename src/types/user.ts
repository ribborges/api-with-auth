interface UserSchema {
    username: string;
    email: string;
    authentication: {
        password: string;
        salt: string;
        sessionToken?: string;
    }
}

export { UserSchema };