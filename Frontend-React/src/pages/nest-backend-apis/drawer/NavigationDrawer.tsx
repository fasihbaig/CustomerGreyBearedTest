import { Add, Search } from '@mui/icons-material'

import { Link } from 'react-router-dom'
import { useNavigationDrawerContext } from '../../../contexts';
import { DrawerItems } from '../../../taxonomies';


function NavigationDrawer() {
    const { activeTab } = useNavigationDrawerContext();

    return (
        <div className=' w-full md:w-[250px] text-white bg-slate-700  divide-y divide-slate-900'>
            <div
                className={`font-semibold cursor-pointer hover:bg-gray-600 ${activeTab === DrawerItems.ALL && 'bg-gray-600'}`}>
                <Link to={'/customer/all'} className={`w-full h-full block px-4 py-2 `}>
                    <Search /> All
                </Link>
            </div>
            <div
                className={`font-semibold cursor-pointer hover:bg-gray-600 ${activeTab === DrawerItems.ADD && 'bg-gray-600'}`}>
                <Link to={'/customer/add'} className='w-full h-full block px-4 py-2 ' >
                    <Add /> Add
                </Link>
            </div>
        </div>
    )
}

export default NavigationDrawer

