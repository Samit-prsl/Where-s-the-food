import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
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
import { useToast } from "@/hooks/use-toast"

import SecureReqContext from '../contexts/Requests'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  items: z.array(z.string()).nonempty({ message: "Items are required." }),
  aggregator: z.string().min(1, { message: "Aggregator is required." }),
  netAmount: z.string().min(1, { message: "Net amount must be a positive number." }),
  grossAmount: z.string().min(1, { message: "Gross amount must be a positive number." }),
  tax: z.string().min(1, { message: "Tax must be a positive number." }),
  discounts: z.string().min(1, { message: "Discounts must be a positive number." }),
  eventLog: z.string().min(1, { message: "Order status is required." }),
  time: z.string().min(1, { message: "Time is required." }),
})

export default function CreateOrder() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { post } = useContext(SecureReqContext)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
      aggregator: "",
      netAmount: 0,
      grossAmount: 0,
      tax: 0,
      discounts: 0,
      eventLog: "",
      time: "",
    },
  })
  const nav = useNavigate()
  const { toast } = useToast()
  async function onSubmit(values) {
    const storeId = localStorage.getItem('storeId')
    if(!storeId) {
      toast({
        title: "Failure",
        description: "you need to create a store first",
      });
      return nav('/store')
    }
    setIsSubmitting(true)
    await post(`order/${storeId}`, values)
      .then((data) => {console.log(data);
        toast({
          title: "Success",
          description: "Order Created Successfully!",
        });
        setTimeout(()=>{
         nav('/listorders')
        },[1000])
      }
      )
      .catch((err) =>{ console.log(err);  toast({
        title: "Error",
        description: "Something went wrong!",
      });})
      .finally(() => setIsSubmitting(false))
  }

  return (
    <Card className='lg:w-1/2 w-3/4 md:w-1/2 my-8 mx-auto bg-slate-100'>
      <CardHeader>
        <CardTitle className='text-center my-5 text-3xl'>Create New Order</CardTitle>
        <CardDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Items</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter items, separated by commas" 
                  {...field} 
                  onChange={(e) => field.onChange(e.target.value.split(','))} 
                />
              </FormControl>
              <FormDescription>
                List of items in the order.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
              <FormField
                control={form.control}
                name="aggregator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aggregator</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter aggregator" {...field} />
                    </FormControl>
                    <FormDescription>
                      The food delivery aggregator.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="netAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter net amount" {...field} />
                    </FormControl>
                    <FormDescription>
                      Net amount of the order.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grossAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter gross amount" {...field} />
                    </FormControl>
                    <FormDescription>
                      Gross amount of the order.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter tax in %" {...field} />
                    </FormControl>
                    <FormDescription>
                      Tax applied to the order in %.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discounts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discounts</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter discount in %" {...field} />
                    </FormControl>
                    <FormDescription>
                      Discounts applied to the order in %.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventLog"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Status</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full p-2 border rounded">
                        <option value="">Select status</option>
                        <option value="not deliverable">Not Deliverable</option>
                        <option value="scheduled delivery">Scheduled Delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </FormControl>
                    <FormDescription>
                      Status of the order.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormDescription>
                      Time of the order.
                    </FormDescription>
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
