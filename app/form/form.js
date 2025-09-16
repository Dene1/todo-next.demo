"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {z} from "zod"

import {Button} from "@/components/button/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/form/form"
import {Input} from "@/components/form/input"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function InputForm() {

  const saveTodos = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data) {
    toast("You submitted the following values", {
      description: (
          <pre className="mt-2 w-[600px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 flex justify-between gap-6 mt-4">
          <FormField
              control={form.control}
              name="new todo"
              render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input className="w-full" placeholder="New task title" {...field} />
                    </FormControl>
                    <FormDescription>
                      {/*This is your public display name.*/}
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
          <Button type="submit">Add</Button>
        </form>
      </Form>
  )
}