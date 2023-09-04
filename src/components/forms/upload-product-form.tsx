"use client"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getSubcategories, productsCategories } from "@/config/products";
import { uploadProductSchema } from "@/lib/validations/product";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc-server";
import { isArrayOfFile } from "@/lib/utils";
import { uploadImage } from "@/trpc-server/routers/app";

type Inputs = z.infer<typeof uploadProductSchema>

const UploadProductForm = ({ }) => {

  const mutation = trpc.productUpload.useMutation()

  const form = useForm<Inputs>({
    resolver: zodResolver(uploadProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "clothing",
      subCategory: "",

    }
  })

  const subCategories = getSubcategories(form.watch("category"))

  async function onSubmit(data: Inputs) {
    if (!data) return

    const formData = new FormData()
    for (let i = 0; i < data.images.length; i++) {

      // Append the object as JSON to the FormData with a unique key
      formData.append(`files${i}`, data.images[i]);
    } formData.append("name", data.name);
    const res = await fetch("/api/uploadFiles", {
      method: "POST",
      body: formData,
    }).then(res => res.json())
    const links = await res.imageLinks
    await mutation.mutateAsync({ ...data, images: links })
    // await mutation.mutateAsync(data)
    toast({ description: "success" })
  }

  return <Form {...form}>
    <form autoFocus={false} className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
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
                    {productsCategories.map(item => (
                      <SelectItem key={item.title} value={item.title.toLowerCase()} >{item.title}</SelectItem>

                    ))}
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
                <Select defaultValue={field.value?.toString()} onValueChange={(value) => field.onChange(value)} >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories.map(item => (
                      <SelectItem key={item.value} value={item.value.toLowerCase()} >{item.label}</SelectItem>
                    ))}
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
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => field.onChange(e.target.files)}
                  multiple
                  type="file"
                  accept="image/*"
                  placeholder="Upload product images here."
                  className=""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button size="sm" type="submit">Add Product</Button>
    </form>
  </Form>
};

export default UploadProductForm;
