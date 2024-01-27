import { ArrowRight, Delete, Edit } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button } from '@mui/material';
import { Customer } from '../../interfaces';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CustomerService } from '../../services/customer.service';

interface Props {
    customerDetails: Customer,
    defaultOpen?: boolean,
    refreshList: () => void;
}

function CustomerDetailCard({
    customerDetails,
    defaultOpen = false,
    refreshList
}: Props) {
    const [customerDetailsVisibility, toggleVisibility] = useState(defaultOpen);


    const handleOnClick = (id: string) => {
        CustomerService.getInstance().deleteCustomer(id).then(() => {
            refreshList()
        }).catch((error: any) => {
            console.error(error)
        })
    }


    return (
        <div className='flex flex-col border-gray-500 border p-2 rounded text-gray-50 '>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row'>
                    <div className='px-2'>
                        <Button
                            className="cursor-pointer !p-0 w-auto !min-w-1"
                            onClick={() => toggleVisibility(!customerDetailsVisibility)}
                        >
                            {customerDetailsVisibility ? <ArrowDropDownIcon /> : <ArrowRight />}
                        </Button>
                    </div>
                    <div className='font-bold'>
                        <span>{customerDetails.name}</span>
                    </div>
                </div>
                <div>
                    <Link to={'/customer/edit'} state={customerDetails}> <Button><Edit /></Button></Link>
                    <Button onClick={() => handleOnClick(customerDetails.id)}><Delete /></Button>
                </div>

            </div>

            <div className={`border-gray-500 border p-2 rounded mt-1 divide-y divide-slate-700 mx-8 ${(!customerDetailsVisibility) && 'hidden'}`}>
                <div className='flex flex-row'>
                    <div>Email: </div>
                    <div className='ml-[5px]'>{customerDetails.email}</div>
                </div>
                <div className='flex flex-row'>
                    <div>Phone Number:</div>
                    <div className='ml-[5px]'>{customerDetails.phoneNumber ? customerDetails.phoneNumber : "-"}</div>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetailCard
