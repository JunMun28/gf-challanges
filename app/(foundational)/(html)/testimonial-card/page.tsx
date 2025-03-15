import TestimonialCard from "../../../../components/TestimonialCard";

export default function TestimonialCardPage() {
  return (
    <div className="font-sans">
      <div className="flex justify-center items-start w-full h-screen py-[200px] bg-[linear-gradient(148deg,#FFFFFF_8.89%,#F0F4F8_100.48%)]">
        <TestimonialCard
          name="Sarah Dole"
          username="@sarahdole"
          testimonial="I've been searching for high-quality abstract images for my design projects, and I'm thrilled to have found this platform. The variety and depth of creativity are astounding!"
          avatarSrc="/profile-thumbnail.png"
        />
      </div>
    </div>
  );
}
