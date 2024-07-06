import React from 'react'
import Logo from './logo'
import SideRoutes from './sidebar-routes'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadon-sm bg-white dark:bg-slate-900">
        <div className="p-6">
        <Link href="/">
            <Logo />
        </Link>
        </div>
        <div className="flex flex-col w-full">
            <SideRoutes/>
        </div>
    </div>
  )
}

export default Sidebar