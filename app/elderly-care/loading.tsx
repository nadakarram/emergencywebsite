import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-6">
            <Skeleton className="h-8 w-20" />
          </div>

          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <Skeleton className="w-24 h-24 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-40 mx-auto md:mx-0 mb-4" />
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <Skeleton className="h-4 w-20 mx-auto mb-2" />
                        <Skeleton className="h-6 w-8 mx-auto" />
                      </div>
                      <div className="text-center">
                        <Skeleton className="h-4 w-20 mx-auto mb-2" />
                        <Skeleton className="h-6 w-16 mx-auto" />
                      </div>
                      <div className="text-center">
                        <Skeleton className="h-4 w-20 mx-auto mb-2" />
                        <Skeleton className="h-6 w-12 mx-auto" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
