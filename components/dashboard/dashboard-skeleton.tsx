import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="w-9 h-9 rounded-md" />
            <Skeleton className="w-9 h-9 rounded-md" />
            <Skeleton className="w-9 h-9 rounded-md" />
            <Skeleton className="w-9 h-9 rounded-md" />
          </div>
        </div>

        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="w-8 h-8 rounded-lg" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-8 w-20" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Charts Section */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <Card className="xl:col-span-2 border-0">
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[320px] w-full" />
                </CardContent>
              </Card>

              {/* Users Chart */}
              <Card className="border-0">
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[320px] w-full" />
                  <div className="mt-4 space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Chart */}
              <Card className="lg:col-span-2 xl:col-span-1 border-0">
                <CardHeader>
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[250px] w-full" />
                  <div className="mt-4 space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-3 h-3 rounded-full" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-4 w-12" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0">
              <CardHeader>
                <Skeleton className="h-6 w-28" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-12" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaigns Table */}
          <Card className="lg:col-span-2 border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-48 mt-1" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="flex gap-4 mt-6">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-28" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="w-8 h-8" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border-0">
            <CardHeader>
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20 mt-1" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-6 w-12" />
                      <Skeleton className="h-3 w-10 mt-1" />
                    </div>
                  </div>
                  <Skeleton className="h-2 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                    <Skeleton className="w-11 h-11 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-24" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}