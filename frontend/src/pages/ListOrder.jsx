import { useContext, useEffect, useState } from 'react'
import { Input } from "../components/ui/input"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent, SelectGroup } from "../components/ui/select"
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../components/ui/table"
import SecureReqContext from '../contexts/Requests'
import { CustomDatePicker } from '../components/ui/CustomDatepicker'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../components/ui/button"

export default function OrderList() {
  const [sortBy, setSortBy] = useState('')
  const [filterAggregator, setFilterAggregator] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState(null)
  const [filterDateTo, setFilterDateTo] = useState(null)
  const [orders, setOrders] = useState([])
  const { get } = useContext(SecureReqContext)
  const nav = useNavigate()
  async function GET() {
    await get('api/orders')
      .then((data) => setOrders(data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    GET()
  }, [])

  const handleDateChange = (selectedDate) => {
    setFilterDateFrom(selectedDate.from);
    setFilterDateTo(selectedDate.to);
  }

  const sortedFilteredOrders = orders
    .filter(order => {
      const orderDate = new Date(order.date)
      return (
        (!filterAggregator || order.aggregator.includes(filterAggregator)) &&
        (!filterDateFrom || orderDate >= filterDateFrom) &&
        (!filterDateTo || orderDate <= filterDateTo)
      )
    })
    .sort((a, b) => {
      if (sortBy === 'netAmount') return a.netAmount - b.netAmount
      if (sortBy === 'discounts') return a.discounts - b.discounts
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date)
      return 0
    })

  return (
    <>
    <div className='w-[80%] my-8 mx-auto bg-slate-100 rounded-md'>
      <div className='text-center my-5 text-3xl'>Order List</div>
      <div className="mb-4 ml-5">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="netAmount">Net Amount</SelectItem>
              <SelectItem value="discounts">Discounts</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4 lg:flex md:flex lg:space-x-8 md:space-x-8 ml-5 ">
        <CustomDatePicker value={{ from: filterDateFrom, to: filterDateTo }} onChange={handleDateChange} placeholder="From Date" className='w-1/4 my-2' />
        <Input placeholder="Enter full name of Aggregator to filter" value={filterAggregator} onChange={(e) => setFilterAggregator(e.target.value)} className='lg:w-1/4 md:w-1/4 w-[90%] my-2' />
        <Link to={'/order'}><Button className='lg:mx-auto md:mx-auto my-2'>
           Create Order
        </Button></Link>
        <div className=' mx-auto my-2'> <Button onClick={()=>nav('/')}>Go to dashboard</Button></div>
      </div>
      <Table className='mx-2'>
        <TableHeader>
          <TableRow>
            <TableCell>Store ID</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Aggregator</TableCell>
            <TableCell>Net Amount</TableCell>
            <TableCell>Gross Amount</TableCell>
            <TableCell>Tax</TableCell>
            <TableCell>Discounts</TableCell>
            <TableCell>Event Log</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedFilteredOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.storeId}</TableCell>
              <TableCell>{order.items.join(',')}</TableCell>
              <TableCell>{order.aggregator}</TableCell>
              <TableCell>{order.netAmount}</TableCell>
              <TableCell>{order.grossAmount}</TableCell>
              <TableCell>{order.tax}</TableCell>
              <TableCell>{order.discounts}</TableCell>
              <TableCell>{order.eventLog}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>{order.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </>)
}
