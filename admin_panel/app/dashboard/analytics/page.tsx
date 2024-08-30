"use client"
import React, { useState, useEffect } from 'react'
import { getAnalyticsData } from './ga'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import VisitorChart from '@/components/charts/visitorChart'
import AnalyticsSkeleton from '@/components/loading/analyticsSkeleton'
import { TriangleAlert } from 'lucide-react'

type visitorsProps = {
  date: string | null | undefined
  activeUsers: number
}

const page = () => {
  const [loading, setLoading] = useState(true);
  const [visitorsData, setVisitorsData] = useState<visitorsProps[]>([
    {
      date: "",
      activeUsers: 0
    }
  ]);

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
      const result = await getAnalyticsData();

      const analyticsData = result?.rows?.map(row => ({
        // @ts-ignore
        date: formatDate(row?.dimensionValues[0]?.value), // Assuming the first dimension is the date
        // @ts-ignore
        activeUsers: parseInt(row?.metricValues[0]?.value), // Assuming the first metric is active users
      }));

      const arr = visitorsData;

      analyticsData?.map(data => (
        arr?.push(data)
      ))
      
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
        </div>
      }
    </section>
  )
}

export default page