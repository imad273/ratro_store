"use client"
import React, { useState, useEffect } from 'react'
import { getUsersData } from './activeUsers'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import VisitorChart from '@/components/charts/visitorChart'
import AnalyticsSkeleton from '@/components/loading/analyticsSkeleton'
import { Banknote, CreditCard, TriangleAlert } from 'lucide-react'
import { getDevicesData } from './devices'
import DevicesPieChart from '@/components/charts/devicesPieChart'
import supabase from '@/lib/supabaseClient'
import OrdersBarsChart from '@/components/charts/ordersBarsChart'

type visitorsProps = {
  date: string | null | undefined
  activeUsers: number
}

type devicesProps = {
  name: string | null | undefined
  value: number
}

type barChartDataProps = {
  date: string
  orders: number
}

const page = () => {
  const [googleAnalyticsLoading, setGoogleAnalyticsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [visitorsData, setVisitorsData] = useState<visitorsProps[]>([
    {
      date: "",
      activeUsers: 0
    }
  ]);

  const [devicesData, setDevicesData] = useState<devicesProps[] | undefined>([]);
  const [barChartData, setBarChartData] = useState<barChartDataProps[] | undefined>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  function formatDate(analyticsDate: string) {
    const month = analyticsDate.substring(4, 6);
    const day = analyticsDate.substring(6, 8);
    const date = new Date(`${month}-${day}`);
    const options = { month: 'short', day: 'numeric' };
    // @ts-ignore
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    const fetchGoogleAnalytics = async () => {
      const users = await getUsersData();
      const devices = await getDevicesData();

      const analyticsData = users?.rows?.map(row => ({
        // @ts-ignore
        date: formatDate(row?.dimensionValues[0]?.value), // Assuming the first dimension is the date
        // @ts-ignore
        activeUsers: parseInt(row?.metricValues[0]?.value), // Assuming the first metric is active users
      }));
      const arr = visitorsData;

      analyticsData?.map(data => (
        arr?.push(data)
      ))

      const devicesData = devices?.rows?.map(row => {
        return {
          // @ts-ignore
          name: row?.dimensionValues[0]?.value,
          // @ts-ignore
          value: parseInt(row?.metricValues[0]?.value, 10),
        };
      });

      setDevicesData(devicesData);

      setVisitorsData(arr);
      setGoogleAnalyticsLoading(false);
    }

    fetchGoogleAnalytics()
  }, [])

  useEffect(() => {
    const fetchOrdersSum = async () => {
      const { data, count } = await supabase
        .from('orders')
        .select('created_at, total_amount, order_status', { count: "exact" })
        .eq('order_status', 'paid');

      let sum = 0;
      data?.map(order => (sum += order.total_amount));

      const currentDate = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);

      // Filter the data for the last month
      const filteredData = data?.filter(item => {
        const createdAtDate = new Date(item.created_at);
        return createdAtDate >= thirtyDaysAgo && createdAtDate <= currentDate;
      });

      const orderCountByDate = filteredData?.reduce((acc: any, item: any) => {
        const date = new Date(item.created_at).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short'
        }); // Convert to date string
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {});

      const BarChartData = Object.keys(orderCountByDate).map(date => ({
        date: date,
        orders: orderCountByDate[date]
      }));

      setBarChartData(BarChartData);

      count && setTotalOrders(count);
      setTotalRevenue(sum)
      setOrdersLoading(false)
    }

    fetchOrdersSum();
  }, [])

  function getPercentage(deviceName: string) {

    if (devicesData && devicesData.length > 0) {
      // Calculate the total sum
      const totalSum = devicesData?.reduce((acc, item) => acc + item.value, 0);

      // Find the device item
      const device = devicesData?.find(item => item.name === deviceName);

      // Return the percentage if device is found
      if (device) {
        return ((device.value / totalSum) * 100).toFixed(2) + '%';
      }
    }
  }

  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold tracking-tight">
        Analytics
      </h2>

      {googleAnalyticsLoading || ordersLoading ?
        <AnalyticsSkeleton />
        :
        <div>
          <div className='grid grid-cols-2 gap-5'>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>

                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>

                <Banknote className="w-5 h-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue}</div>
              </CardContent>
            </Card>
          </div>
          <div className='grid grid-cols-2 gap-5 my-5'>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Visitors - {visitorsData?.reduce((acc, item) => acc + item.activeUsers, 0)}</CardTitle>
                  <CardDescription>
                    Showing total visitors for the last month
                  </CardDescription>
                </CardHeader>
                {visitorsData.length === 1 ?
                  <CardContent>
                    <div className='flex flex-col items-center justify-center gap-3 h-[300px]'>
                      <TriangleAlert size={26} />
                      <p>No Data Available</p>
                    </div>
                  </CardContent>
                  :
                  <CardContent className='p-2'>
                    <VisitorChart data={visitorsData} />
                  </CardContent>
                }
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Devices</CardTitle>
                  <CardDescription>
                    Showing visitors devices for the last month
                  </CardDescription>
                </CardHeader>
                {devicesData?.length === 0 ?
                  <CardContent>
                    <div className='flex flex-col items-center justify-center gap-3 h-[300px]'>
                      <TriangleAlert size={26} />
                      <p>No Data Available</p>
                    </div>
                  </CardContent>
                  :
                  <CardContent className='p-2'>
                    <DevicesPieChart data={devicesData} />

                    <CardFooter>
                      <div>
                        <div className='flex items-center gap-3'>
                          <div className='w-4 h-4 rounded-md bg-[#F56B4A]'></div>
                          Mobile - {getPercentage("mobile")}
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='w-4 h-4 rounded-md bg-[#F9CC5B]'></div>
                          Desktop - {getPercentage("desktop")}
                        </div>
                      </div>
                    </CardFooter>
                  </CardContent>
                }
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Most Orders Days</CardTitle>
                  <CardDescription>
                    Showing Most Orders Days in the last month
                  </CardDescription>
                </CardHeader>
                {barChartData?.length === 0 ?
                  <CardContent>
                    <div className='flex flex-col items-center justify-center gap-3 h-[300px]'>
                      <TriangleAlert size={26} />
                      <p>No Data Available</p>
                    </div>
                  </CardContent>
                  :
                  <CardContent className='p-2'>
                    <OrdersBarsChart data={barChartData} />
                  </CardContent>
                }
              </Card>
            </div>
          </div>
        </div>
      }
    </section>
  )
}

export default page