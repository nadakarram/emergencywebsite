import { Skeleton } from "@/components/ui/skeleton"

export default function PhysicalTherapyLoading() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="flex justify-end mb-4">
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-48 mx-auto md:mx-0 mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto md:mx-0 mb-4" />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto mb-2" />
                      <Skeleton className="h-6 w-8 mx-auto" />
                    </div>
                    <div className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto mb-2" />
                      <Skeleton className="h-6 w-16 mx-auto" />
                    </div>
                    <div className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto mb-2" />
                      <Skeleton className="h-6 w-16 mx-auto" />
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
  )
}
