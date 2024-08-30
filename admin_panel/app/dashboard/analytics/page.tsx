"use client"
import React, { useState, useEffect } from 'react'
import { getUsersData } from './activeUsers'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import VisitorChart from '@/components/charts/visitorChart'
import AnalyticsSkeleton from '@/components/loading/analyticsSkeleton'
import { TriangleAlert } from 'lucide-react'
import { getDevicesData } from './devices'
import DevicesPieChart from '@/components/charts/devicesPieChart'

type visitorsProps = {
  date: string | null | undefined
  activeUsers: number
}

type devicesProps = {
  name: string | null | undefined
  value: number
}

const page = () => {
  const [loading, setLoading] = useState(true);
  const [visitorsData, setVisitorsData] = useState<visitorsProps[]>([
    {
      date: "",
      activeUsers: 0
    }
  ]);

  const [devicesData, setDevicesData] = useState<devicesProps[] | undefined>([]);

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

      console.log(devicesData);
      setDevicesData(devicesData);

      setVisitorsData(arr);
      setLoading(false);
    }

    fetchGoogleAnalytics()
  }, [])

  useEffect(() => {
    console.log(visitorsData);
  }, [visitorsData])

  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold tracking-tight">
        Analytics
      </h2>

      {loading ?
        <AnalyticsSkeleton />
        :
        <div className='grid grid-cols-2 gap-5 my-5'>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Visitors</CardTitle>
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
              {visitorsData.length === 1 ?
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
                        Mobile
                      </div>
                      <div className='flex items-center gap-3'>
                        <div className='w-4 h-4 rounded-md bg-[#F9CC5B]'></div>
                        Desktop
                      </div>
                    </div>
                  </CardFooter>
                </CardContent>
              }
            </Card>
          </div>
        </div>
      }
    </section>
  )
}

export default page