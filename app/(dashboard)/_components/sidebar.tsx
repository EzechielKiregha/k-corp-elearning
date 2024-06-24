import React from 'react'
import Logo from './logo'
import SideRoutes from './sidebar-routes'

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadon-sm bg-white">
        <div className="p-6">
            <Logo/>
        </div>
        <div className="flex flex-col w-full">
            <SideRoutes/>
        </div>
    </div>
  )
}

export default Sidebar