function Nav() {
    return (
        <div>
            <nav className=' flex flex-col md:flex-row md:justify-between bg-slate-600'>
                <div className='flex flex-col md:flex-row md:justify-start w-full'>
                    <div className='flex justify-start w-auto'>
                        <img
                            className="h-14 md:h-12 w-auto py-2 px-2 text-white"
                            src="/public/tab-icon.png"
                            alt="Task Snap"
                            style={{ fill: 'white', stroke: 'white' }}
                        />
                        <div><h1 className="text-3xl pt-1 drop-shadow-sm font-semibold text-gray-200 "> Customer </h1></div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav
