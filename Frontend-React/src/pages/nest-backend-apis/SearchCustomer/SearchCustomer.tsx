import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material";
import CustomerList from "../../../components/CustomerList/CustomerList";
import { Customer } from "../../../interfaces";
import { CustomerService } from "../../../services/customer.service";
import { DrawerContextAction, useNavigationDrawerContext } from "../../../contexts";
import { DrawerItems } from "../../../taxonomies";

interface State {
    loading: boolean,
    data: Customer[],
    error: string
}

const SearchCustomer = () => {
    const [customerData, setCustomers] = useState<State>({ loading: false, data: [], error: "" });

    const { activeTab, dispatchUpdateActiveTab } = useNavigationDrawerContext();



    useEffect(() => {
        if (activeTab !== DrawerItems.ADD) {
            dispatchUpdateActiveTab({ type: DrawerContextAction.UPDATE, payload: DrawerItems.ALL });
        }
        handlerFetchUniversities()
    }, []);

    const handlerFetchUniversities = async (id?: string) => {
        try {
            setCustomers((state) => ({ ...state, loading: true }));
            const customers = await CustomerService.getInstance().getAllCustomers();
            setCustomers((state) => ({ ...state, loading: false, data: customers }));
        } catch (error) {
            setCustomers((state) => ({ ...state, loading: false, data: [], error: (error as Error).message }));
        }
    }

    return (
        <>
            <h1 className=" font-bold text-gray-400 text-2xl pl-4 my-4">Customers</h1>

            <div className={`mt-4 pl-2 h-full text-center`}>
                {
                    (customerData.loading) ?
                        <CircularProgress sx={{ color: '#acacac' }} /> :
                        <CustomerList
                            customerList={customerData.data}
                            refreshList={handlerFetchUniversities}
                        />
                }
            </div>
        </>
    )
}

export default SearchCustomer
