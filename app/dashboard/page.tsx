import CollectionCard from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import SadFace from "@/components/icons/SadFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomMsg />
      </Suspense>
      <Suspense fallback={<div>Kategorien laden...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomMsg() {
  const user = await currentUser();

  if (!user) {
    return <div>error</div>;
  }

  return (
    <div className="flex w-full mb-12">
    <h1 className="flex gap-3 items-center text-3xl ">
     Willkommen, <br/> {user.firstName} {user.lastName} 
   
   </h1>   
   </div>
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full" >
    <div className="text-3xl">
   <Skeleton className="w-[150px] h-[36px]"/>
   <Skeleton className="w-[150px] h-[36px]"/>
   </div>   
   </div> 
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex md:w-96 flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>Hier ist noch alles Leer</AlertTitle>
          <AlertDescription>
          Erstelle eine kategorie um zu starten.
          </AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }

  return (
    < >
    <div className="flex gap-5  justify-start">
      <div className="flex flex-col gap-5 justify-center ">
      <CreateCollectionBtn />
    
      </div>
    
    </div>
    <div className="grid md:grid-cols-3 font-medium gap-5 mt-10">
  {collections.map((collection) => (
    <CollectionCard key={collection.id} 
     collection={collection} />
  ))}
  </div>
  </>
  );
}
