"use client"

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import qs from "query-string"

const SearchInput = () => {

    const [value, setValue] = useState("")
    const debounceValue = useDebounce(value)

    const pathNane = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get("categoryId")

    useEffect(() => {
        const url = qs.stringifyUrl({
            url : pathNane,
            query : {
                title : debounceValue,
                categoryId : currentCategoryId,
            }
        },{skipNull:true, skipEmptyString:true});

        router.push(url);
    }, [debounceValue, currentCategoryId, router, pathNane])

  return (
    <div className="relative">
        <Search
            className='h-4 w-4 absolute top-3 left-3 text-slate-600 dark:text-slate-400'
        />
        <Input 
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder='Search for a course'
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200 dark:bg-slate-700 dark:focus-visible:ring-slate-200"/>
        
    </div>
  )
}

export default SearchInput