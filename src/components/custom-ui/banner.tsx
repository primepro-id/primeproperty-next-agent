import Image from "next/image";
import Link from "next/link";

export const Banner = () => {
  return (
    <Link href="/properties/402">
      <Image
        src="/images/banner.jpeg"
        alt="Primepro Indonesia"
        width={2048}
        height={1024}
        className="object-cover w-full h-auto sm:h-64 md:h-80 lg:h-96 xl:object-fill rounded-b"
        priority
      />
    </Link>
  );
};
