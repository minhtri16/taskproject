// import { Metadata } from "next"
// import Link from "next/link"
// import { Button } from "../ui/button"

import TaskPage from "./page";



// export const metadata: Metadata = {
//   title: "Examples",
//   description: "Check out some examples app built using the components.",
// }

export default function ExamplesLayout() {
  return (
    <>
      <div className="border-grid border-b">
        <div className="container-wrapper">
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <TaskPage />
          </div>
        </div>
      </div>
    </>
  )
}
