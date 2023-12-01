
import { Task } from "@prisma/client";
import React, { useTransition } from "react";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { deleteTask, setTaskToDone } from "@/actions/task";
import { useRouter } from "next/navigation";
import { Baloo_2 } from "next/font/google";
import { toast } from "./ui/use-toast";

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;

  if (days < 0) return "text-gray-300 dark:text-gray-400";

  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-green-500 dark:text-green-400";
}

function TaskCard({ task }: { task: Task }) {

  const removeTask = async () => {
    try {
      await deleteTask(task.id);

      router.refresh();
    } catch (e) {

    }
  };
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex gap-2 items-start">
      <Checkbox
        id={task.id.toString()}
        className="w-5 h-5"
        checked={task.done}
        disabled={task.done || isLoading}
        onCheckedChange={() => {
          startTransition(async () => {
            await setTaskToDone(task.id);
            router.refresh();

            setTimeout(async () => {
              // Hier kannst du den Code für das Löschen aus deiner Datenbank hinzufügen
              try {
                // Hier ein Beispiel, wie du die Datenbankoperation durchführen könntest
                await removeTask(); 
                toast({
                  title: "Aufgabe abgeschlossen",});

              } catch (error) {
                toast({
                  title: "Error",
                  description: "Aufgabe konnte nicht abgeschlossen werden",
                  variant: "destructive",});
              }
            }, 1000);
            clearTimeout

          });
        }}
      />
      <label
        htmlFor={task.id.toString()}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white",
          task.done && "line-through"
        )}
      >
        {task.content}
        {task.expiresAt && (
          <p
            className={cn(
              "text-xs text-neutral-500 dark:text-neutral-400",
              getExpirationColor(task.expiresAt)
            )}
          >
            {format(task.expiresAt, "dd/MM/yyyy")}
          </p>
        )}
      </label>
    </div>
  );
}

export default TaskCard;
