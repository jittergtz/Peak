import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
 
export default function Page() {
  return (
    <>
    <NavBar/>
    <Button className="m-3 bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 text-neutral-600">
    <Link href={"/"}>
    zurück
    </Link>
    </Button>

    <div className="flex flex-col justify-center items-center gap-10 h-[90vh]">
    <h1 className="text-5xl tracking-tighter ">Einloggen</h1>
   <SignIn />
   </div>
   </>
  )
}