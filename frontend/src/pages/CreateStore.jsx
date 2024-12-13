import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"
import  {aggregators}  from '../lib/utils'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import SecureReqContext from '../contexts/Requests'
import { useToast } from "@/hooks/use-toast"

//import { toast } from "../components/ui/toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }).max(50, {
    message: "Store name must not exceed 50 characters.",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).max(20, {
    message: "Username must not exceed 20 characters.",
  }).regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
  aggregator: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one aggregator.",
  }),
})

export default function CreateStore() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {post} = useContext(SecureReqContext)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      aggregator: [],
    },
  })
  const { toast } = useToast()
  async function onSubmit(values) {
    setIsSubmitting(true)
    console.log(values);
    await post('store',values).then((data)=>{console.log(data);localStorage.setItem('storeId',data.store._id);
      toast({
        title: "Success",
        description: "Store Created Successfully!",
      });
      setTimeout(() => {
        window.location.replace('/')
      }, 1000);
    }).catch((err)=>{console.log(err);  toast({
      title: "Error",
      description: "Something went wrong!",
    });}
    ).finally(()=>setIsSubmitting(false))
  }

  return (
    <Card className='lg:w-1/2 md:w-1/2 w-3/4 my-8 mx-auto bg-slate-100'>
  <CardHeader>
    <CardTitle className='text-center my-5 text-3xl'>Create New Store</CardTitle>
    <CardDescription>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter store name" {...field} />
              </FormControl>
              <FormDescription>
                Your store's name as it will appear to customers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This will be your unique identifier. Use only letters, numbers, and underscores.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormDescription>
                Must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aggregators"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Aggregators</FormLabel>
                <FormDescription>
                  Select the food delivery aggregators you want to work with.
                </FormDescription>
              </div>
              {aggregators.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="aggregator"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
       <div className=' flex justify-center items-center'>
       <Button type="submit" disabled={isSubmitting} className='mx-auto'>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
       </div>
      </form>
    </Form>
    </CardDescription>
  </CardHeader>
</Card>
  )
}

