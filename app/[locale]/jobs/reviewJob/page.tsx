import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useTranslations} from 'next-intl';

function Page() {
  const t = useTranslations('Jobs');
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FA] to-white">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl">
          <h1 className="text-1xl md:text-2xl font-bold text-gray-900 mb-8 tracking-tight">
{(t('pageTitle'))}          </h1>

          <div className="bg-white border-2 rounded-2xl shadow-xl p-8 mb-10 transition-all duration-300 hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service Details */}
              <div className="space-y-8">
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('service'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('serviceDescription'))}</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('description'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('descriptionDetails'))} </p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('professionalCleaners'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('cleanersDetails'))}</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('frequency'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('frequencyDetails'))}</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('coverageArea'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('coverageDetails'))}</p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-8">
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('accommodation'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('accommodationDetails'))}</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('equipment'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('equipmentDetails'))}</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('rate'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('rateDetails'))}</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('appointmentDate'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('appointmentDateDetails'))}</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('duration'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('durationDetails'))}</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{(t('location'))}</h2>
                  <p className="text-gray-700 text-lg">{(t('locationDetails'))}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary Card */}
          <div className="bg-white border-2 rounded-2xl shadow-xl p-8 max-w-md mb-10 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {(t('Summary'))}
            </h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-lg text-gray-700">{(t('serviceAmount'))}</span>
                <span className="text-xl text-gray-900 font-semibold">€150.00</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-lg text-gray-700">{(t('vat'))}</span>
                <span className="text-xl text-gray-900 font-semibold">€22.50</span>
              </div>
              <div className="flex justify-between items-center pt-6">
                <span className="text-xl font-bold text-gray-900">{(t('total'))}</span>
                <span className="text-2xl font-bold text-[#00BFFF]">€172.50</span>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <div className="mt-8 flex justify-center items-center">
            <Link href={"/jobs/"}>
              <Button
                type="submit"
                className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
              >
                <span>{(t("next"))}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;