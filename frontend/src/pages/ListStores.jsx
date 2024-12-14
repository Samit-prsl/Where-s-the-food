import React, { useContext, useEffect, useState } from 'react';
import SecureReqContext from '../contexts/Requests';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import EditStoreForm from '../components/custom/EditStoreForm';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const ListStores = () => {
    const [data, setData] = useState([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { get } = useContext(SecureReqContext)
    const nav = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                await get('api/stores').then((data) => setData(data))
            } catch (err) {
                console.error('Error fetching data', err);
            }
        };
        fetchData();
    }, []);
    const handleSheetClose = () => {
        setIsSheetOpen(false);
        window.location.reload(); 
      };

    const findAggregatorData = (aggregators, name) => {
        const aggregator = aggregators?.find(agg => agg.aggregator.toLowerCase() === name.toLowerCase());
        return aggregator || { time: 'no recent orders', timeElapsed: null };
    };

    return (
        <Card className="lg:min-w-1/2 md:min-w-1/2 min-w-1/2 my-8 lg:mx-auto md:mx-auto mx-10 bg-slate-100">
            <CardHeader>
                <CardTitle className="text-center my-5 text-3xl">Order Management</CardTitle>
                <CardDescription>
                    {data.length ? <Table>
                        <TableCaption>A list of your recent stores-order time elapses since last order</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Store Name</TableHead>
                                <TableHead className="w-[200px]">Recent order time</TableHead>
                                <TableHead className="w-[150px]">Zomato</TableHead>
                                <TableHead className="w-[150px]">Swiggy</TableHead>
                                <TableHead className="w-[150px]">Uber Eats</TableHead>
                                <TableHead className="w-[150px]">DoorDash</TableHead>
                                <TableHead className="w-[150px]">Deliveroo</TableHead>
                                <TableHead className="w-[150px]">Edit store</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((store, index) => {
                                const zomatoData = findAggregatorData(store.aggregators, 'zomato');
                                const swiggyData = findAggregatorData(store.aggregators, 'swiggy');
                                const uberData = findAggregatorData(store.aggregators, 'uberEats');
                                const DoorDash = findAggregatorData(store.aggregators, 'DoorDash');
                                const Deliveroo = findAggregatorData(store.aggregators, 'Deliveroo');
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{store.storeName}</TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                {store.aggregators?.map((agg, i) => (
                                                    <div key={i}>
                                                        {agg.time || 'no recent orders'} ({agg.aggregator})
                                                    </div>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {zomatoData.timeElapsed != null 
                                                ? (zomatoData.timeElapsed < 60 
                                                    ? `${zomatoData.timeElapsed} mins` 
                                                    : `${Math.floor(zomatoData.timeElapsed / 60)} hr ${zomatoData.timeElapsed % 60} mins`
                                                ) 
                                                : 'No data'}
                                            </TableCell>
                                            <TableCell>
                                            {swiggyData.timeElapsed != null 
                                                ? (swiggyData.timeElapsed < 60 
                                                    ? `${swiggyData.timeElapsed} mins` 
                                                    : `${Math.floor(swiggyData.timeElapsed / 60)} hr ${swiggyData.timeElapsed % 60} mins`
                                                ) 
                                                : 'No data'}
                                            </TableCell>
                                            <TableCell>
                                            {uberData.timeElapsed != null 
                                                ? (uberData.timeElapsed < 60 
                                                    ? `${uberData.timeElapsed} mins` 
                                                    : `${Math.floor(uberData.timeElapsed / 60)} hr ${uberData.timeElapsed % 60} mins`
                                                ) 
                                                : 'No data'}
                                            </TableCell>
                                            <TableCell>
                                            {DoorDash.timeElapsed != null 
                                                ? (DoorDash.timeElapsed < 60 
                                                    ? `${DoorDash.timeElapsed} mins` 
                                                    : `${Math.floor(DoorDash.timeElapsed / 60)} hr ${DoorDash.timeElapsed % 60} mins`
                                                ) 
                                                : 'No data'}
                                            </TableCell>
                                            <TableCell>
                                            {Deliveroo.timeElapsed != null 
                                                ? (Deliveroo.timeElapsed < 60 
                                                    ? `${Deliveroo.timeElapsed} mins` 
                                                    : `${Math.floor(Deliveroo.timeElapsed / 60)} hr ${Deliveroo.timeElapsed % 60} mins`
                                                ) 
                                                : 'No data'}
                                            </TableCell>

                                        <TableCell>
                                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} className='overflow-y-auto'>
                                            <SheetTrigger><Button>Edit store details</Button></SheetTrigger>
                                            <SheetContent className='overflow-y-auto'>
                                                <EditStoreForm onClose={handleSheetClose}/>
                                            </SheetContent>
                                            </Sheet>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table> : <div className=' flex justify-center items-center'>
                            No data found or you logged in as a user!
                        </div>}
                   <div className=' flex justify-center items-center my-5 space-x-6'> 
                    <Button onClick={()=>nav('/store')}>Create Store</Button>
                   <Button onClick={()=>nav('/order')}>Create Orders</Button>
                   <Button onClick={()=>nav('/')}>Home</Button></div>
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default ListStores;