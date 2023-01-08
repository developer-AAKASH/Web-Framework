import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import {Attributes} from "./Attributes";
import {AxiosResponse} from "axios";

type Callback = () => {};
 export interface UserProps {
    id?: number; // why we are making this compulsory.
    name?: string;
    age?: number;
}


export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>( 'https://localhost:3000/users');
    public attributes: Attributes<UserProps>;

    constructor (attrs: UserProps) {
        this.attributes = new Attributes<UserProps> (attrs);
    }

    get get () {
        return this.attributes.get;
    }

    get on () {
        return this.events.on;
    }

    get trigger () {
        return this.events.trigger;
    }

    set (update: UserProps): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    fetch (): void {
        const id = this.get('id');

        if (typeof id !== 'number') {
            throw new Error('Cannot fetch without and id !!');
        }

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data);
        });
    }

    save(): void {
        this.sync.save(this.attributes.getAllAttributes()).then((response: AxiosResponse): void => {
            this.trigger('save');
        })
        .catch(() => {
            this.trigger('error');
        });
    }
 }