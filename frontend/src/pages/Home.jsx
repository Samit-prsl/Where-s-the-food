import {Link, useNavigate} from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Home() {
    const nav = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-16">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Order Management App</CardTitle>
          <CardDescription className="text-center">Streamline your order and store management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link to={'/order'} className="contents">
              <Button className="h-20 text-lg w-full" variant="default">
                Create Order
              </Button>
            </Link>
            <Link to={'/store'} className="contents">
              <Button className="h-20 text-lg w-full" variant="default">
                Create Store
              </Button>
            </Link>
            <Link to={`/listorders`} className="contents">
              <Button className="h-20 text-lg w-full" variant="default">
                List Orders
              </Button>
            </Link>
            <Link to={`/liststores`} className="contents">
              <Button className="h-20 text-lg w-full" variant="default">
                List Stores
              </Button>
            </Link>
          </div>
          <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={()=>{localStorage.removeItem('token');nav('/login')}}>Logout</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

