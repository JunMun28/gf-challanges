import BlogCard from "@/components/BlogCard";

export default function page() {
  return (
    <div className="flex justify-center items-start w-full h-screen py-[120px] bg-[linear-gradient(148deg,#F9FAFB_8.89%,#D2D6DB_100.48%)]">
      <BlogCard
        title="Top 5 Living Room Inspirations"
        description="Curated vibrants colors for your living, make it pop & calm in the same time."
        tagName="Interior"
        imageSrc="/spacejoy-YqFz7UMm8qE-unsplash.jpg"
        callToAction="Read More"
      />
    </div>
  );
}
