import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div>
      <p className="text-3xl text-sky-800">
        this is a protected page
      </p>
    </div>
  )
}
