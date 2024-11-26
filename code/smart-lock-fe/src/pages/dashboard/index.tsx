import LockStatus from "@/components/lock-status"

export default function DashboardPage() {
  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 text-primary">
      <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Dashboard</h1>
      <div className="gap-5 grid grid-cols-2 mx-auto w-full max-w-lg">
        <div className="col-span-2">
          <LockStatus status={true} />
        </div>
        <div className="col-span-1 bg-blue-birds">
          temp here
        </div>
        <div className="col-span-1 bg-blue-birds">
          humidity here
        </div>
        <div className="col-span-2 bg-blue-birds">
          light here
        </div>
      </div>
    </div>
  )
}