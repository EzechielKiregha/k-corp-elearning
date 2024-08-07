import React from 'react'
import Logo from './logo'
import SideRoutes from './sidebar-routes'
import Link from 'next/link'
import TGlink from '@/components/CustomLink'
import { SignOutButton } from '@/components/SignOutButton'

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadon-sm bg-white dark:bg-slate-900">
        <div className="p-6">
        <TGlink href="/">
            <Logo />
        </TGlink>
        </div>
        <div className="flex flex-col w-full">
            <SideRoutes/>
        </div>
        <div className="font-[500] pl-6 transition-all ">
              <SignOutButton/>
        </div>
    </div>
  )
}

export default Sidebar