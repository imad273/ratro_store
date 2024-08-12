import StoreSettingsForm from '@/components/forms/settings/StoreSettingsForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const page = () => {
  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold tracking-tight">
        Settings
      </h2>
      <Tabs defaultValue="store" className="space-y-4">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="store" className="space-y-4">
          <StoreSettingsForm />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default page