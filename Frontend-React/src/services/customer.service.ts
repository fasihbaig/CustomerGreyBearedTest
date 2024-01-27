import httpClient from "./httpClient";
import { Customer } from "../interfaces";

export class CustomerService {
    private static instance: CustomerService;

    private constructor() {
        CustomerService.instance = this;
    }

    async getAllCustomers(id?: string): Promise<Customer[]> {
        try {
            let url = `/customers/all${id && `?id=${id}` || ""}`
            const response = await httpClient.get(url);
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message || "Unable to get customers list")
        }
    }


    async addCustomer(customer: Customer) {
        try {
            const response = await httpClient.post(`/customers/add`, customer);
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message || "Unable to add new Customer.")
        }
    }

    async updateCustomerData(customer: Customer, id: string) {
        try {
            const response = await httpClient.put(`/customers/update/${id}`, customer);
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message || "Unable to update Customer details.")
        }
    }

    async deleteCustomer(id: string) {
        try {
            const response = await httpClient.delete(`/customers/delete/${id}`);
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message || "Unable to delete Customer.")
        }
    }



    static getInstance() {
        if (!CustomerService.instance) {
            return new CustomerService();
        }
        return CustomerService.instance;
    }
};
