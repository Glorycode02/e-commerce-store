"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ComponentProps } from 'react'

const Nav = ({ children }: { children: React.ReactNode }) => {
    return <nav className='bg-black text-secondary-foreground flex justify-center px-4'>
        {children}
    </nav>
}

export default Nav


export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname();
    return <Link {...props} className={cn('p-4  hover:bg-primary focus-visible:hover:bg-primary text-primary-foreground hover:text-primary-foreground focus-visible:hover:text-secondary-foreground', pathname === props.href && "bg-secondary text-secondary-foreground")} />
}