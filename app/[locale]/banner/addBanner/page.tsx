"use client";
import { useTranslations } from 'next-intl';
import { useState, ChangeEvent, FormEvent } from 'react';

const AddBannerPage = () => {
  const t = useTranslations('banner');
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ images });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex justify-start p-6">
      <form 
        onSubmit={handleSubmit} 
        className=" rounded-2xl p-10 w-full max-w-3xl space-y-8 mx-auto md:mx-0">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{(t('upload_Banner'))}</h2>

        <div className="flex flex-col space-y-4">
          <label className="text-lg text-gray-700 font-medium">{(t('select_Image'))}</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#00BFFF] border-gray-300 border-2 rounded-lg file:text-white file:font-semibold hover:file:bg-[#00BFFF]"
          />
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt={`Preview ${index}`} 
                  className="w-full h-40 object-cover rounded-lg shadow-lg" 
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#00BFFF] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#00BFFF] focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {(t('upload_Banner'))}
        </button>
      </form>
    </div>
  );
};

export default AddBannerPage;
