import ProfileCard from "@/components/ProfileCard";

export default function ProfileCardPage() {
  return (
    <div className="flex h-screen w-full justify-center items-start pt-[200px] bg-[linear-gradient(148deg,#F9FAFB_8.89%,#D2D6DB_100.48%)]">
      <ProfileCard
        name="Sarah Dole"
        username="sarahdole"
        avatarSrc="/profile-thumbnail.png"
        bio="I turn coffee into bugs which are fixed by someone else. Certified Stack Overflow and ChatGPT developer."
      />
    </div>
  );
}
