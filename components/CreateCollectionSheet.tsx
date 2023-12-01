import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useForm } from "react-hook-form";
import {
  createCollectionSchema,
  createCollectionSchemaType,
} from "@/schema/createCollection";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createCollection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateCollectionSheet({ open, onOpenChange }: Props) {
  const form = useForm<createCollectionSchemaType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {},
  });

  const router = useRouter();

  const onSubmit = async (data: createCollectionSchemaType) => {
    try {
      await createCollection(data);

      // Close the sheet
      openChangeWrapper(false);
      router.refresh();

      toast({
        title: "Success",
        description: "Collection created successfully!",
      });
    } catch (e: any) {
      // Show toast
      toast({
        title: "Error",
        description: "Etwas ist schief gelaufen :(",
        variant: "destructive",
      });
      console.log("Error while creating collection", e);
    }
  };

  const openChangeWrapper = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Neue Kategorie hinzufügen</SheetTitle>
          <SheetDescription>
          Kategorien sind eine möglichkeit um deine Aufgaben zu unterteilen
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Sport" {...field} />
                  </FormControl>
                  <FormDescription>Kategorie Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farbe</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          "w-full h-8 text-white",
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue
                          placeholder="Farbe wählen"
                          className="w-full h-8"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8`,
                              CollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                  Wähle eine Farbe für die Kategorie
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button
            disabled={form.formState.isSubmitting}
            variant={"outline"}
            className={cn(
              form.watch("color") &&
                CollectionColors[form.getValues("color") as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
           Hinzufügen
            {form.formState.isSubmitting && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateCollectionSheet;
