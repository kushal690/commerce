"use client"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getSubcategories, productsCategories } from "@/config/products";
import { uploadProductSchema } from "@/lib/validations/product";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc-server";
const FileDialog = dynamic(() => import("../FileDialog"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-8 " />
});
import { useState, useTransition } from "react";
import { FileWithPreview } from "@/types";
import { uploadImages } from "@/_actions/uploadImages";
import { Zoom } from "../zoom-image";
import Image from "next/image";
import { Icons } from "../icons";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { toTitleCase } from "@/lib/utils";

type Inputs = z.infer<typeof uploadProductSchema>

const UploadProductForm = ({ }) => {

  const mutation = trpc.productUpload.useMutation()

  const form = useForm<Inputs>({
    resolver: zodResolver(uploadProductSchema),
    defaultValues: {
      category: "clothing",
    }
  })

  const subCategories = getSubcategories(form.watch("category"))

  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
  const [isPending, startTransition] = useTransition()

  function onSubmit(data: Inputs) {
    if (!data || !data.images) return
    startTransition(async () => {
      try {
        const formData = new FormData()
        for (let i = 0; i < data.images.length; i++) {
          formData.append(`files${i}`, data.images[i]);
        }
        const links = await uploadImages(formData)
        await mutation.mutateAsync({ ...data, images: links })
        form.reset()
        setFiles(null)
        toast({ description: "Successully added product." })
      } catch (err: any) {
        const unknownErr = "Error while creating product";
        toast({ variant: "destructive", description: err.message || unknownErr })
      }
    })

  }

  return <Form {...form}>
    <form autoFocus={false} className="flex flex-col space-y-4" onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder="Type product name here."
                className=""
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Type product description here."
                className=""
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select defaultValue={field.value} onValueChange={(value) => field.onChange(value)} >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {productsCategories.map(item => (
                        <SelectItem key={item.title} value={item.title.toLowerCase()} >{toTitleCase(item.title)}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory</FormLabel>
              <FormControl>
                <Select value={field.value?.toString()} onValueChange={field.onChange} >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {subCategories.map(item => (
                        <SelectItem key={item.value} value={item.value.toLowerCase()} >{toTitleCase(item.label)}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Type product price here."
                  className=""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>In Stock</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Type product quantity here."
                  className=""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col gap-1.5">
            <FormLabel>Images</FormLabel>
            {files?.length ? (
              <div className="flex items-center gap-2">
                {files.map((file, i) => (
                  <Zoom key={i}>
                    <Image
                      src={file.preview}
                      alt={file.name}
                      className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                      width={80}
                      height={80}
                    />
                  </Zoom>
                ))}
              </div>
            ) : null}

            <FormControl >
              <FileDialog name="images" disabled={isPending} setValue={form.setValue} files={files} setFiles={setFiles} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button disabled={isPending} size="lg" className="w-36" type="submit">
        {isPending ? <> <Icons.spinner className="w-4 h-4 mr-2 animate-spin" /> <span> Adding... </span> </> : "Add Product"}
      </Button>
    </form>
  </Form>
};

export default UploadProductForm;
