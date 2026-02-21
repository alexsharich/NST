type EmailConfirmation = {
    confirmationCode: string | null;
    expirationDate: Date | null;
};

type PasswordRecovery = {
    recoveryCode: string | null;
    expirationDate: Date | null;
};

export type UserDbType = {
    id: number
    login: string
    passwordHash: string
    email: string
    isEmailConfirmed: boolean
    emailConfirmation: EmailConfirmation | null
    passwordRecovery: PasswordRecovery | null
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
}


/*
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    isEmailConfirmed BOOLEAN NOT NULL DEFAULT FALSE,
    emailConfirmation JSONB,
    passwordRecovery JSONB,
    deletedAt TIMESTAMP WITH TIME ZONE NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/
