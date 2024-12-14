import * as React from "react"
import { useContext, useState } from 'react'
import { useForm,Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent, SelectGroup } from "../components/ui/select"
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
import { useToast } from "../hooks/use-toast"
import { Link } from "react-router-dom"
import SecureReqContext from '../contexts/Requests'
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
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
  role: z.enum(['admin', 'user'], {
    message: "Role must be either Admin or User.",
  }),
})

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { post } = useContext(SecureReqContext)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "user", 
    },
  })
  const nav = useNavigate()
  const { toast } = useToast()
  async function onSubmit(values) {
    setIsSubmitting(true)
    await post('register', values).then((data) => {
      console.log(data);  
      toast({
        title: "Success",
        description: "Registered Successfully!",
      });
      setTimeout(()=>{
        nav('/login')
      },[1000])
    }).catch((err) => {
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }).finally(()=>{
      setIsSubmitting(false)
    });
  }

  return (
    <Card className='lg:w-1/2 md:w-1/2 w-3/4 my-8 mx-auto bg-slate-100'>
      <CardHeader>
        <CardTitle className='text-center my-5 text-3xl'>Sign up</CardTitle>
        <CardDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                    <Controller
                        name="role"
                        control={form.control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose your role as either Admin or User.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-center items-center'>
                <Button type="submit" disabled={isSubmitting} className='mx-auto'>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
          <div className=" flex justify-center items-center mt-5">
          <Link to={'/login'} className=" text-lg hover:text-teal-800 text-gray-600 text-center">Click here to login</Link>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
