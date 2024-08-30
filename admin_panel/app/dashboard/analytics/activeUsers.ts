"use server"

import { BetaAnalyticsDataClient } from "@google-analytics/data";

export const getUsersData = async () => {
  const propertyId = "456440721";

  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: "starting-account-g6qk0qw09f1u@ratro-1724953983982.iam.gserviceaccount.com",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/MgOGliLsBMry\nPGKbvAEhNphCL5D/lTg5czqNjuLI6hgSFfSGsOFVwDdgDRFGCQuVd/RZVAcqtjsL\ni7LT0gtYB8pOfOZ09OQsPd1hIq/C79/F+1VKIiQ7XbbkrOTPnM/7gt61l+Q8u+pS\n7KaT5DvyE8IK7LboDdJUS3fdnwpNwNp2nWvNxhKP8aAv0uvCmrYUzyt6h8KDdeg+\nFiInfO+1pcsdNixNK8E5vJJ3fbCh5Qls2uHhmxbBBqAo0WJ+3FX1R5CzVV744LKu\n+3vzGauQUe9RdUSN+I1WcL1Q0BlHkIfyiX86NzGLcIJrH+9JZGEivEkSac0lSDOb\ntWOqWYrjAgMBAAECggEAEq0OU8bgnGYPc5VbGylEgaZf6GnVuRGDZMvmVqOJcDoQ\nUIadKcxSBoVNzhpuAIWrqwBaTvYlSRJ0jA6A+63odm3fC3Gp3+zNSQELWeIAgdiF\nPEVDsd0fOulO5IwllvNottcJbXrrzCmdnFdfd3zI2j78f61bDynNIiIeZaM+Z2pu\n2Sj1AtQRHR8uySQzfoUnZYR4+pKuYv7NhBgGysVg6336R3K4zPa0AgYj5KhwURwO\nQ5wNwkHIZU6hKBp0QcGL8cQ7CFfJ1inVlrDBOTSTRUQs2cY3vglVpTdNEDy1GY3I\nvyVsST2d1UFLIoIaGlk9saIcayWBl7u3NbcAaYvhaQKBgQDtIy4lefU4Q7lKDIwF\nIHW1ZyrN5HEqWuSRJsNIArvM6F5zLtVB1Mk579sznQMKbRfsaIVdWC3yr10Bk07m\nf2cbEwJbTcA2UPIedqYnOteRbAgmiSP7EPUaQLn30a2mxxK/ku6FAuurofd+9Kmz\nGhgcg7DKvv+/mn3Y3glfLkEKZQKBgQDOZ1E47RfBrup0K5vQOUQT8JOXEBVbNsUQ\n94KeGcOIyzd2o7RkEIMDtQUVo/yW+Zah8T8ONWL1GrL/nARUWLIlaQc7lekaZRvz\nTsD1re+ElkfcMVqmj4MivK+aJy4SHdd3oyQZBXw20VcxgxNledn2eStStqvi3Rp0\ntB6K6GcHpwKBgQDeOeG87RWIrK6vXiK5iznDzfKnEDWc46DfBdxrV2R3Giuo9XKU\nRrxstwJM1A9Nbf7FZQ3V9BTbIMuf9lQyXaJaFO5Ycfx26lR7h+UdTl9FwF/C/THi\nznljKNUeEDkT2esP7LnpnFsOdLJjHxUI6qM91YuP9H3nKPhWi31s3QPGoQKBgQCD\ng3VPTlKayHb++mJXdIWaJuoDkO3qpqU+QFbrogLjAIkggQKJ17ODAy5wMYLaN8Hx\nAaRpyz54akCveZuQmss35woCv2w9szrx9rYgVGmPE6pJ9PCLvFmUIqHJGTnTtUv7\nIOn5P3N8AjsKgzgyqkdlMqOWGmq/LJ6UycfEPnyXdQKBgHJLrvW52SUSZNGCK4Q6\nVsNaGvSfqXRRgZCrJJ4pcFBMSKpb2SGbCdOS7Ftz+6o2qqVFFAYtfUBsQJ/4yKxD\nuZoKS8Ex6sJ5mH/hkbebBt3z0L314sK392THaDT0p3uT1OZsO4lQRjxTTTfmO6A1\nVqEYXjy1pn8GBThZ8fDucVNZ\n-----END PRIVATE KEY-----\n".replace(/\n/gm, "\n"), // replacing is necessary
    },
  });


  // 👇 Running a simple report
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: `30daysAgo`, //👈  e.g. "7daysAgo" or "30daysAgo"
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "date",
      },
    ],
    metrics: [
      {
        name: "activeUsers", // it returs the active users
      },
    ],
  });

  return response;
}
