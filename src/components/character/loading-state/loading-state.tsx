// Components
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState() {
    return (
        <div className="md:justify-start justify-center max-w-[1370px] mx-auto mt-14 flex flex-wrap gap-x-3 gap-y-5">
            {new Array(6).fill(0).map((_, index) => (
                <div className="flex flex-col space-y-3" key={index}>
                    <Skeleton className="h-[300px] w-[260px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    )
}