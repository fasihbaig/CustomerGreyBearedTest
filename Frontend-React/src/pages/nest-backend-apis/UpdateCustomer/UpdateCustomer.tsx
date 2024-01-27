import { useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom';
import CustomerForm from '../CustomerForm/CustomerForm';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../interfaces';

export interface ResponseStatus {
    apiStatus: boolean | null,
    message: string | null,
    inProgress: boolean
}

function UpdateCustomer() {
    const [responseStatus, updateResponseStatus] = useState<ResponseStatus>({ apiStatus: null, message: null, inProgress: false });

    const location = useLocation();
    const navigator = useNavigate();

    const { state: customerData } = location;

    const updateCustomerHandler = (formData: CustomerForm) => {
        updateResponseStatus({ apiStatus: null, message: null, inProgress: true });
        CustomerService.getInstance().updateCustomerData({
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber
        } as Customer, customerData.id).then(() => {
            updateResponseStatus({ apiStatus: true, message: "Customer data updated successfully.", inProgress: false });
            navigator("/customer/search")
        }).catch((error) => {
            updateResponseStatus({ apiStatus: false, message: error.message || "Unable to update Customer data.", inProgress: false });
        })
    }

    return (
        <div className='w-full'>
            <h1 className=" font-bold text-gray-400 text-2xl pl-4 my-4">Update Customer</h1>
            {(customerData && customerData.id) ?
                <CustomerForm
                    onFormSubmission={updateCustomerHandler}
                    responseStatus={responseStatus}
                    defaultValues={customerData}
                    submitButtonName={"Update"}
                />
                : <p className='text-gray-400 ml-5'>Customer data not found.</p>
            }
        </div>
    )
}

export default UpdateCustomer
