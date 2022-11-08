import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

 export interface UserProps {
    id?: number; // why we are making this compulsory.
    name?: string;
    age?: number;
}


export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>( 'https://localhost:3000/users');

    constructor (private data: UserProps) {}

    get (propertyName: string): (number | string) {
        return this.data[propertyName]; // error here.
    }

    set (update: UserProps): void {
        Object.assign(this.data, update);
    }
}