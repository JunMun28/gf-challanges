import Image from "next/image";

interface ProfileCardProps {
  name?: string;
  jobTitle?: string;
  avatarSrc?: string;
  bio?: string;
}

export default function ProfileCard({
  name = "Name",
  jobTitle = "Username",
  avatarSrc = "/profile-thumbnail.png",
  bio = "Bio",
}: ProfileCardProps) {
  return (
    <div className="w-[340px] py-24 px-16 bg-white rounded-lg shadow-sm gap-40 flex flex-col">
      <div className="flex flex-col gap-24">
        <div className="flex justify-center items-center">
          <Image src={avatarSrc} alt="Profile Picture" width={64} height={64} />
        </div>
        <div className="flex justify-center items-center flex-col gap-2">
          <div className="text-xl text-neutral-900 font-medium">{name}</div>
          <div className="text-sm text-neutral-600">{jobTitle}</div>
        </div>
        <p className="text-neutral-600 text-center">{bio}</p>
      </div>
      <div className="flex flex-col items-start gap-24">
        <button className="bg-indigo-700 text-white px-16 py-10 self-stretch shadow-sm rounded-sm">
          Contact me
        </button>
        <div className="flex justify-center items-start gap-16 self-stretch">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-label="Github"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.0008 9.66666C13.3966 9.66666 9.66748 13.3958 9.66748 18C9.66748 21.6875 12.0529 24.8021 15.3654 25.9062C15.7821 25.9792 15.9383 25.7292 15.9383 25.5104C15.9383 25.3125 15.9279 24.6562 15.9279 23.9583C13.8341 24.3437 13.2925 23.4479 13.1258 22.9792C13.0321 22.7396 12.6258 22 12.2716 21.8021C11.98 21.6458 11.5633 21.2604 12.2612 21.25C12.9175 21.2396 13.3862 21.8542 13.5425 22.1042C14.2925 23.3646 15.4904 23.0104 15.9696 22.7917C16.0425 22.25 16.2612 21.8854 16.5008 21.6771C14.6466 21.4687 12.7091 20.75 12.7091 17.5625C12.7091 16.6562 13.0321 15.9062 13.5633 15.3229C13.48 15.1146 13.1883 14.2604 13.6466 13.1146C13.6466 13.1146 14.3446 12.8958 15.9383 13.9687C16.605 13.7812 17.3133 13.6875 18.0217 13.6875C18.73 13.6875 19.4383 13.7812 20.105 13.9687C21.6987 12.8854 22.3967 13.1146 22.3967 13.1146C22.855 14.2604 22.5633 15.1146 22.48 15.3229C23.0112 15.9062 23.3342 16.6458 23.3342 17.5625C23.3342 20.7604 21.3862 21.4687 19.5321 21.6771C19.8342 21.9375 20.0946 22.4375 20.0946 23.2187C20.0946 24.3333 20.0842 25.2292 20.0842 25.5104C20.0842 25.7292 20.2404 25.9896 20.6571 25.9062C24.0492 24.7611 26.3332 21.5802 26.3342 18C26.3342 13.3958 22.605 9.66666 18.0008 9.66666Z"
              fill="#4338CA"
            />
          </svg>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-label="LinkedIn"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2802 23.2825H21.0589V19.8018C21.0589 18.9718 21.0421 17.9037 19.9014 17.9037C18.7433 17.9037 18.5664 18.8069 18.5664 19.7406V23.2825H16.3452V16.125H18.4789V17.1006H18.5077C18.8058 16.5381 19.5308 15.9444 20.6139 15.9444C22.8646 15.9444 23.2808 17.4257 23.2808 19.3538L23.2802 23.2825ZM13.8364 15.1456C13.1214 15.1456 12.5471 14.5669 12.5471 13.855C12.5471 13.1437 13.1221 12.5656 13.8364 12.5656C14.5489 12.5656 15.1264 13.1437 15.1264 13.855C15.1264 14.5669 14.5483 15.1456 13.8364 15.1456ZM14.9502 23.2825H12.7227V16.125H14.9502V23.2825ZM24.3914 10.5H11.6077C10.9958 10.5 10.5008 10.9838 10.5008 11.5806V24.4194C10.5008 25.0168 10.9958 25.5 11.6077 25.5H24.3896C25.0008 25.5 25.5008 25.0168 25.5008 24.4194V11.5806C25.5008 10.9838 25.0008 10.5 24.3896 10.5H24.3914Z"
              fill="#4338CA"
            />
          </svg>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-label="Instagram"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.8567 9.66748C19.7946 9.66903 20.2698 9.67399 20.6805 9.68621L20.8422 9.69151C21.0291 9.69815 21.2134 9.70648 21.4357 9.7169C22.3224 9.75786 22.9273 9.89815 23.4586 10.1044C24.0078 10.3162 24.4717 10.6023 24.9349 11.0655C25.3974 11.5287 25.6836 11.994 25.8961 12.5419C26.1016 13.0724 26.2419 13.678 26.2836 14.5648C26.2935 14.787 26.3015 14.9714 26.3081 15.1582L26.3133 15.32C26.3255 15.7306 26.3311 16.2059 26.3328 17.1437L26.3335 17.7652C26.3336 17.8411 26.3336 17.9194 26.3336 18.0002L26.3335 18.2353L26.333 18.8567C26.3314 19.7946 26.3265 20.2698 26.3142 20.6805L26.3089 20.8422C26.3023 21.0291 26.294 21.2134 26.2836 21.4357C26.2426 22.3224 26.1016 22.9273 25.8961 23.4586C25.6842 24.0078 25.3974 24.4717 24.9349 24.9349C24.4717 25.3974 24.0057 25.6836 23.4586 25.8961C22.9273 26.1016 22.3224 26.2419 21.4357 26.2836C21.2134 26.2935 21.0291 26.3015 20.8422 26.3081L20.6805 26.3133C20.2698 26.3255 19.7946 26.3311 18.8567 26.3328L18.2353 26.3335C18.1594 26.3336 18.0811 26.3336 18.0002 26.3336L17.7652 26.3335L17.1437 26.333C16.2059 26.3314 15.7306 26.3265 15.32 26.3142L15.1582 26.3089C14.9714 26.3023 14.787 26.294 14.5648 26.2836C13.678 26.2426 13.0738 26.1016 12.5419 25.8961C11.9933 25.6842 11.5287 25.3974 11.0655 24.9349C10.6023 24.4717 10.3169 24.0057 10.1044 23.4586C9.89815 22.9273 9.75856 22.3224 9.7169 21.4357C9.707 21.2134 9.69892 21.0291 9.69238 20.8422L9.68714 20.6805C9.67495 20.2698 9.66939 19.7946 9.66759 18.8567L9.66748 17.1437C9.66903 16.2059 9.67399 15.7306 9.68621 15.32L9.69151 15.1582C9.69815 14.9714 9.70648 14.787 9.7169 14.5648C9.75786 13.6773 9.89815 13.0731 10.1044 12.5419C10.3162 11.9933 10.6023 11.5287 11.0655 11.0655C11.5287 10.6023 11.994 10.3169 12.5419 10.1044C13.0731 9.89815 13.6773 9.75856 14.5648 9.7169C14.787 9.707 14.9714 9.69892 15.1582 9.69238L15.32 9.68714C15.7306 9.67495 16.2059 9.66939 17.1437 9.66759L18.8567 9.66748ZM18.0002 13.8336C15.6978 13.8336 13.8336 15.6998 13.8336 18.0002C13.8336 20.3027 15.6998 22.1669 18.0002 22.1669C20.3027 22.1669 22.1669 20.3006 22.1669 18.0002C22.1669 15.6978 20.3006 13.8336 18.0002 13.8336ZM18.0002 15.5002C19.381 15.5002 20.5002 16.6191 20.5002 18.0002C20.5002 19.381 19.3813 20.5002 18.0002 20.5002C16.6195 20.5002 15.5002 19.3813 15.5002 18.0002C15.5002 16.6195 16.6191 15.5002 18.0002 15.5002ZM22.3752 12.5836C21.8008 12.5836 21.3336 13.0501 21.3336 13.6245C21.3336 14.1989 21.8002 14.6662 22.3752 14.6662C22.9496 14.6662 23.4169 14.1996 23.4169 13.6245C23.4169 13.0501 22.9488 12.5828 22.3752 12.5836Z"
              fill="#4338CA"
            />
          </svg>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-label="X / Twitter"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.1707 9.875H25.9273L19.9048 16.7583L26.9898 26.125H21.4423L17.0973 20.4442L12.1257 26.125H9.36736L15.809 18.7625L9.01236 9.875H14.7007L18.6282 15.0675L23.1707 9.875ZM22.2032 24.475H23.7307L13.8707 11.4383H12.2315L22.2032 24.475Z"
              fill="#4338CA"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
