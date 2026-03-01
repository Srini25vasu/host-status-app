import { CustomerStatus } from "../enums/customer-enum";

export interface Customer {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    status: CustomerStatus;
    address: Address;
}

export interface Address {
    street: string;
    postcode: number;
    city: string;
    country: string;
}



