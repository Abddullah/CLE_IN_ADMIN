import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const SuccessModal = ({ onClose }: { onClose: () => void }) => {
    const t = useTranslations("successModal");
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-center text-green-600">{(t('category_added_sucessfully'))}</h2>
        <div className="mt-4 text-center">
        <p className="text-center text-gray-600 mt-2">{(t('category_added_message'))}</p>
          <Button onClick={onClose} className="bg-[#00BFFF] mt-3 hover:bg-[#00BFFF] text-white py-2 px-4 rounded">
          {(t('close_button'))}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
