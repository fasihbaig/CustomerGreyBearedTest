import { Navigate, Route, Routes } from 'react-router-dom';

import CustomerPage from './pages/nest-backend-apis/CustomerPage';
import SearchCustomer from './pages/nest-backend-apis/SearchCustomer/SearchCustomer';
import NewCustomer from './pages/nest-backend-apis/NewCustomer/NewCustomer';
import UpdateCustomer from './pages/nest-backend-apis/UpdateCustomer/UpdateCustomer';



function AppRouter() {
    return (

        <Routes>
            <Route path="/customer" element={<CustomerPage />}>
                <Route path='/customer/' element={<SearchCustomer />} />
                <Route path='/customer/all' element={<SearchCustomer />} />
                <Route path='/customer/add' element={<NewCustomer />} />
                <Route path='/customer/edit' element={<UpdateCustomer />} />
            </Route>
            <Route path="*" element={<Navigate to={"/customer/all"} replace />} />
        </Routes>


    )
}

export default AppRouter
