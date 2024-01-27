import { useEffect, useState } from 'react'
import { Customer } from '../../../interfaces'
import { CustomerService } from '../../../services/customer.service'
import CustomerForm from '../CustomerForm/CustomerForm';
import { DrawerContextAction, useNavigationDrawerContext } from '../../../contexts';
import { DrawerItems } from '../../../taxonomies';

export interface ResponseStatus {
    apiStatus: boolean | null,
    message: string | null,
    inProgress: boolean
}

function NewCustomer() {

    const [responseStatus, updateResponseStatus] = useState<ResponseStatus>({ apiStatus: null, message: null, inProgress: false });
    const { activeTab, dispatchUpdateActiveTab } = useNavigationDrawerContext();

    useEffect(() => {
        if (activeTab !== DrawerItems.ADD) {
            dispatchUpdateActiveTab({ type: DrawerContextAction.UPDATE, payload: DrawerItems.ADD });
        }
    }, []);

    const addNewCustomerHandler = (formData: CustomerForm) => {
        updateResponseStatus({ apiStatus: null, message: null, inProgress: true });
        CustomerService.getInstance().addCustomer({
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
        } as Customer).then(() => {
            updateResponseStatus({ apiStatus: true, message: "Customer added successfully", inProgress: false });
        }).catch((error) => {
            updateResponseStatus({ apiStatus: false, message: error.message || "Unable to add new Customer.", inProgress: false });
        })
    }

    return (
        <div className='w-full'>
            <h1 className=" font-bold text-gray-400 text-2xl pl-4 my-4">New Customer</h1>
            <CustomerForm onFormSubmission={addNewCustomerHandler} responseStatus={responseStatus} submitButtonName='Add' />
        </div>
    )
}

export default NewCustomer
