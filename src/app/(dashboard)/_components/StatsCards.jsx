// import { TrendingUp } from 'lucide-react'
// import React from 'react'
// import CountUp from 'react-countup'

// function StatsCards() {
//   const statsQuery = useQuery<GetBalanceStatsResponseType>({
//     queryKey: ["overview", "stats"],
//     queryFn: () =>
//       fetch(
//       )
//   })

//   const income = statsQuery.data?.income || 0
//   const expense = statsQuery.data?.expense || 0

//   const balance = income - expense

//   return (
//     <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
//       <SkeletonWrapper isLoading={statsQuery.isFetching}>
//         <StatCard
//           value={income}
//           title={"Income"}
//           icon={
//             <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
//           }
//         />
//       </SkeletonWrapper>
//     </div>
//   )
// }

// export default StatsCards

// function StatCard({ value, title, icon }) {
//   return (
//     <Card className="flex h-24 w-full ites-center gap-2 p-4">
//       {icon}
//       <div className="flex flex-col items-center gap-0">
//         <p className="text-muted-foreground">{title}</p>
//         <CountUp
//           preserveValue
//           redraw={false}
//           end={value}
//           decimals={2}
//           formattingFn={formatFn}
//           className="text-2xl"
//         />
//       </div>
//     </Card>
//   )
// }