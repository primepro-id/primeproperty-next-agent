import Link from "next/link";
import {
  LuBuilding2,
  LuMapPin,
  LuPhone,
  LuMail,
  LuGlobe,
  LuInstagram,
  LuLinkedin,
  LuFacebook,
  LuYoutube,
} from "react-icons/lu";

export const ContactUs = () => {
  return (
    <section>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Hubungi Kami
      </h2>

      <div className="py-4 rounded-lg mt-6">
        <div className="flex items-center gap-3 mb-4">
          <LuBuilding2 className="h-6 w-6 flex-shrink-0 mt-1 text-primary" />
          <div>
            <h3 className="font-bold">Kantor Pusat:</h3>
            <p>PrimePro Indonesia</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <LuMapPin className="h-6 w-6 flex-shrink-0 mt-1 text-primary" />
          <p>Kemang Icon Jakarta, Jl Kemang Raya No 1, Jakarta Selatan 12730</p>
          <p>Jl Pakubuwono VI No. 35, Kebayoran Baru, Jakarta Selatan 12120</p>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <LuPhone className="h-6 w-6 flex-shrink-0 mt-1 text-primary" />
          <p>+62 821 1616 2995</p>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <LuMail className="h-6 w-6 flex-shrink-0 mt-1 text-primary" />
          <p>primeproagent@gmail.com</p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <LuGlobe className="h-6 w-6 flex-shrink-0 mt-1 text-primary" />
          <p>www.primeproindonesia.com</p>
        </div>

        <div>
          <h3 className="font-bold mb-3">Ikuti Kami:</h3>
          <div className="flex gap-4">
            <Link
              href="https://www.instagram.com/primepro_id/"
              className="hover:text-primary"
            >
              <LuInstagram className="h-6 w-6 " />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://www.linkedin.com/company/primepro-indonesia/"
              className="hover:text-primary"
            >
              <LuLinkedin className="h-6 w-6 " />
              <span className="sr-only">LinkedIn</span>
            </Link>

            <Link
              href="https://www.youtube.com/@primeproindonesia"
              className="hover:text-primary"
            >
              <LuYoutube className="h-6 w-6 " />
              <span className="sr-only">Youtube</span>
            </Link>
            <Link
              href="https://www.facebook.com/share/1BHTU7HvZx/"
              className="hover:text-primary"
            >
              <LuFacebook className="h-6 w-6 " />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
