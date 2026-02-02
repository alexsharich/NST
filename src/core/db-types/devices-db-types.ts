export type DeviceDbType = {
    ip: string
    name: string
    deletedAt: string | null
    iat: string
    userId: string
    deviceId: string
}

/*
CREATE TABLE devices(
    "deviceId" PRIMARY KEY, uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    "ip" varchar NOT NULL,
    "name" varchar NOT NULL,
    "deletedAt" TIMESTAMP WITH TIME ZONE NULL,
    "iat" TIMESTAMP WITH TIME ZONE NOT NULL,
    "userId" varchar INT NOT NULL ,
    FOREIGN KEY (userId) REFERENCES users(id)
)*/