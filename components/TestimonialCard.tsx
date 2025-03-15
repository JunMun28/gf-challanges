import Image from "next/image";

interface TestimonialCardProps {
  name?: string;
  username?: string;
  testimonial?: string;
  avatarSrc?: string;
}

export default function TestimonialCard({
  name = "Name",
  username = "Username",
  testimonial = "Testimonial",
  avatarSrc = "/profile-thumbnail.png",
}: TestimonialCardProps) {
  return (
    <div className="w-[340px] bg-white rounded-lg shadow-sm p-6 flex flex-col items-start gap-4">
      <div className="flex items-center gap-4">
        <Image src={avatarSrc} alt="avatar" width={48} height={48} />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-sm text-gray-500">{username}</p>
        </div>
      </div>
      <div className="text-base text-gray-600">{testimonial}</div>
    </div>
  );
}
