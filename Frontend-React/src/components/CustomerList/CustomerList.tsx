import { Customer } from "../../interfaces"
import ItemCard from "./CustomerItemCard"

function CustomerList(
    { customerList, refreshList }:
        { customerList: Customer[], refreshList: () => void }) {

    return (
        <>
            <div className='overflow-y-auto h-4/5 border-solid border-gray-500 border p-2 rounded mr-2 '>
                <ul className="h-full">
                    {
                        (customerList && customerList.length > 0) ?
                            customerList.map((customer: any, index: number) => (
                                <li key={index} className='mb-[10px]'>
                                    <ItemCard customerDetails={customer} refreshList={refreshList} />
                                </li>
                            )
                            ) :
                            <li className='text-gray-50'>No Customer Data Found</li>
                    }
                </ul>
            </div>
        </>
    )
}

export default CustomerList
