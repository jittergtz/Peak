import NavBar from '@/components/NavBar'
import Animation from '@/components/Animation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import React from 'react'


function page() {
  return (
     <div>
            <div
            className="
             flex
             min-h-screen
             w-full
             flex-col
             items-center
             dark:bg-black"
            >
              
              <NavBar />
              <Separator />
              
              <main className="flex flex-col justify-center items-center mt-64 z-20 ">
                <div className='tracking-tighter text-center mb-10'>
                 <h1 className='text-7xl lg:text-9xl mb-5'>Peak</h1>
                 <h5 className='w-64 lg:w-96 lg:text-2xl text-neutral-500'>Ziele erreichen, Gewohnheiten aufbauen, im Flow bleiben</h5>
                </div>
                <Button >
                <Link href={"/dashboard"}>
                    Loslegen
                    </Link>
                </Button>
             
               
              </main>
              <div className='h-screen -mt-96 lg:-mt-96 md:w-full '>
                <Animation/>
              </div>
           
            
            </div>
     </div>
  )
}

export default page