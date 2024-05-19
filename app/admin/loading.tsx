import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Loader() {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <Loader2 className="size-24 animate-spin" />
        </div>
    )
}