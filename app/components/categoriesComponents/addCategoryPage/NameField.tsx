import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="text" className="font-semibold text-md">Name</Label>
      <Input type="text" className="h-[50px] border-[#4BB1D3] " id="name" />
    </div>
  )
}
