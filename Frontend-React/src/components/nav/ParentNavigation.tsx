import Nav from './Nav';
import { NavigationDrawerContextProvider } from '../../contexts';

import NavigationDrawer from '../../pages/nest-backend-apis/drawer/NavigationDrawer';
import AppRouter from '../../AppRouter';

function ParentNavigation() {

    return (
        <div className='w-full h-full'>
            <Nav />
            <div className='flex w-full h-full'>
                <NavigationDrawerContextProvider>
                    <div>
                        <NavigationDrawer />
                    </div>
                    <AppRouter />
                </NavigationDrawerContextProvider>
            </div>

        </div>
    )
}

export default ParentNavigation
