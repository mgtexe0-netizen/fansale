/** @format */

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import paypallogo from "../../public/paypal-784404_640.webp";
import mastercard from "../../public/mastercard.webp";
import visa from "../../public/visa-logo-png_seeklogo-299317.webp";
import language from "../../public/language.png"
export default function Footer() {
  return (
    <footer className="mt-5">
      <div className="hidden md:block">
        <div className="max-w-[1170px] mx-auto mb-5 bg-white border shadow-lg px-24 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 ml-10 gap-10 text-[13px] text-[#333]">
            <div>
              <h3 className="font-bold mb-2 text-[15px] text-fns-primary">
                About us
              </h3>
              <ul className="space-y-1 text-[14px] list-disc list-inside font-medium text-fns-primary">
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/more-information" className="hover:underline">
                    More information
                  </Link>
                </li>
                <li>
                  <Link href="/top-artists" className="hover:underline">
                    Top artists
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-2 text-[15px]">Help</h3>
              <ul className="space-y-1 text-[14px] list-disc list-inside font-medium text-fns-primary">
                <li>
                  <Link href="/help/purchaser-faqs" className="hover:underline">
                    Purchaser FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/help/seller-faqs" className="hover:underline">
                    Seller FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:text-left">
              <h3 className="font-bold mb-2 text-[15px] text-fns-primary">
                Payment methods
              </h3>
              <div className="flex md:justify-start flex-wrap gap-3 mt-4">
                <span className="inline-flex items-center justify-center px-3 h-7 rounded-sm border border-[#d0d0d0] bg-[#ffffff]">
                  <Image
                    src={visa}
                    alt="VISA"
                    width={40}
                    height={20}
                    className="object-contain"
                  />
                </span>
                <span className="inline-flex items-center justify-center px-3 h-7 rounded-sm border border-[#d0d0d0] bg-[#ffffff]">
                  <Image
                    src={mastercard}
                    alt="Mastercard"
                    width={40}
                    height={20}
                    className="object-contain"
                  />
                </span>
                <span className="inline-flex items-center justify-center px-3 h-7 rounded-sm border border-[#d0d0d0] bg-[#ffffff]">
                  <Image
                    src={paypallogo}
                    alt="PayPal"
                    width={40}
                    height={20}
                    className="object-contain"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-white  max-w-md mx-auto mb-5 border shadow-lg">
        <details className="border-b">
          <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-bold text-[15px] text-fns-primary">
            About us
            <ChevronRight className="w-5 h-5" />
          </summary>
          <ul className="px-6 pb-4 space-y-2 text-[14px] list-disc list-inside font-medium text-fns-primary">
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/more-information" className="hover:underline">
                More information
              </Link>
            </li>
            <li>
              <Link href="/top-artists" className="hover:underline">
                Top artists
              </Link>
            </li>
          </ul>
        </details>

        <details className="border-b">
          <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-bold text-[15px] text-fns-primary">
            Help
            <ChevronRight className="w-5 h-5" />
          </summary>
          <ul className="px-6 pb-4 space-y-2 text-[14px] list-disc list-inside font-medium text-fns-primary">
            <li>
              <Link href="/help/purchaser-faqs" className="hover:underline">
                Purchaser FAQs
              </Link>
            </li>
            <li>
              <Link href="/help/seller-faqs" className="hover:underline">
                Seller FAQs
              </Link>
            </li>
          </ul>
        </details>

        <details className="border-b">
          <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-bold text-[15px] text-fns-primary">
            Payment methods
            <ChevronRight className="w-5 h-5" />
          </summary>
          <div className="px-6 pb-4 flex gap-3">
            <span className="inline-flex items-center justify-center px-3 h-7 rounded-sm border border-[#d0d0d0] bg-[#ffffff]">
              <Image
                src={visa}
                alt="VISA"
                width={40}
                height={20}
                className="object-contain"
              />
            </span>
            <span className="inline-flex items-center justify-center px-3 h-7 rounded-sm border border-[#d0d0d0] bg-[#ffffff]">
              <Image
                src={mastercard}
                alt="Mastercard"
                width={40}
                height={20}
                className="object-contain"
              />
            </span>
            <span className="inline-flex items-center justify-center px-3 h-7 rounded-sm border border-[#d0d0d0] bg-[#ffffff]">
              <Image
                src={paypallogo}
                alt="PayPal"
                width={40}
                height={20}
                className="object-contain"
              />
            </span>
          </div>
        </details>
      </div>

      <div className="bg-fns-primary mt-0">
        <div className="max-w-[1150px] mx-auto flex flex-col md:flex-row gap-4 md:items-center justify-end text-[14px] text-white px-4 md:px-8 py-5">
          <div className="flex px-2 flex-wrap items-center justify-end gap-2 md:gap-8 text-[14px] md:text-[15px] font-medium">
            <Link
              href="/legal-notice"
              className="hover:underline text-white whitespace-nowrap"
            >
              Legal notice
            </Link>
            <span className="text-white hidden md:inline">|</span>
            <Link
              href="/terms-and-conditions"
              className="hover:underline whitespace-nowrap"
            >
              Terms and Conditions
            </Link>
            <span className="text-[#20466c] hidden md:inline">|</span>
            <Link
              href="/privacy-policy"
              className="hover:underline whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
