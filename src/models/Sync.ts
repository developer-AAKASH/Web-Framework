import axios, { AxiosPromise } from "axios";

interface HasId {
    id?: number; // never be null because of out ts-config setting.
}
// new Sync('http://localhost:3000/users');

export class Sync<Type extends HasId> {
    constructor (public baseURL: string) {}

    // customize this method with get and getById
    fetch (id: number): AxiosPromise {
        return axios.get(this.baseURL);
    }
 
    save (data: Type): void {
        const { id } = data;

        if (id) {
            // if in this case whenever id variable get accessd, it will be of type number for sure...
            axios.put(`${this.baseURL}/${id}`, data);
        } else {
            axios.post(this.baseURL, data);
        }
    }
}