import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import  {aggregators}  from '../../lib/utils'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "../ui/sheet"
  
import SecureReqContext from '../../contexts/Requests'
import { useToast } from "@/hooks/use-toast"

export default function EditStoreForm({onClose}) {
const defaultValues = {
        name: "",
        username: "",
        password: "",
        aggregator: [],
}
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {put} = useContext(SecureReqContext)
  const form = useForm({
   defaultValues
  })
  const { toast } = useToast()
  const onSubmit = async (values) => {
    setIsSubmitting(true);
    console.log(values);
    if (values.name === defaultValues.name && 
        values.username === defaultValues.username && 
        values.password === defaultValues.password && 
        values.aggregator.length === defaultValues.aggregator.length) {
      setIsSubmitting(false);
      return toast({
        title: "Error",
        description: "Please enter values!",
      });
    }

    const storeId = localStorage.getItem('storeId');
    try {
      const data = await put(`api/store/${storeId}`, values);
      console.log(data);
      toast({
        title: "Success",
        description: "Edited Successfully!",
      });
      onClose()
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SheetHeader>
    <SheetTitle>Edit Store</SheetTitle>
    <SheetDescription className='overflow-y-auto'>
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
    </SheetDescription>
  </SheetHeader>
  )
}




