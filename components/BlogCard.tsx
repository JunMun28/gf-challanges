import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";

interface BlogCardProps {
  title?: string;
  description?: string;
  tagName?: string;
  imageSrc?: string;
  callToAction?: string;
}

export default function BlogCard({
  title,
  description,
  tagName,
  imageSrc = "/placeholder.png",
  callToAction,
}: BlogCardProps) {
  return (
    <div className="w-[340px] bg-white rounded-lg shadow-sm flex flex-col items-start overflow-hidden">
      <div className="relative w-full h-[288px]">
        <Image
          src={imageSrc}
          alt="blog image"
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-full"
        />
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="bg-[#F0FDF4] inline-flex w-fit items-center rounded-full border border-green-200 px-2 py-0.5 text-green-700">
            {tagName}
          </div>
          <div className="text-lg/[28px] font-semibold">{title}</div>
        </div>
        <div className="flex flex-col gap-6 items-start">
          <div className="text-base/[24px] text-neutral-600">{description}</div>
          <button className="flex justify-center items-center gap-1.5 font-medium text-base/[24px] text-indigo-700">
            <div>{callToAction}</div>
            <LuArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
