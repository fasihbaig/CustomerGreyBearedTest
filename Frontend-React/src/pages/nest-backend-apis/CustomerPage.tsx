import { Outlet } from 'react-router-dom'

function CustomerPage() {


    return (
        <div className=' flex flex-col md:flex-row h-full w-full'>
            <div className='w-full h-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default CustomerPage
