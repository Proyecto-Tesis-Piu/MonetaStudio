export class User {
    firstName: string = '';
    lastName: string = '';
    birthDate: Date = new Date();
    sex: string = '';
    job: string = '';
    civilStateString: string = '';
    email: string = '';
    password: string = '';
    countryCode: string = '';
    stateCode: string = '';
    stateName: string;
}

export class UserAuth0 {
    email: string = '';
    emailVerified: string = '';
    lastName: string = '';
    firstName: string = '';
    userName: string = '';
    provider: string = '';
    providerId: string = '';
}