export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    jobDescription: string;
    companyId: number;
    authData?: string;
}