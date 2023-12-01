"use client";

import React, { useState } from 'react'
import { Button } from './ui/button';
import CreateCollectionSheet from './CreateCollectionSheet';

function CreateCollectionBtn() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open:boolean) => setOpen(open)
  return (
    <div>
<Button variant={"secondary"} onClick={() => setOpen(true)}  className='dark:text-white border  w-full bg-zinc-100 dark:bg-neutral-950 '>
 <span className='my-1'>Kategorie erstellen</span>
</Button>
<CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
</div>
  )
}

export default CreateCollectionBtn