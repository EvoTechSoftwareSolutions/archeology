import React, { useState, useRef } from 'react';
import { FiUpload } from 'react-icons/fi';

import img1 from "../../assets/Admin/Mediagalle fort.png";
import img2 from "../../assets/Admin/Mediagalvihara.png";
import img3 from "../../assets/Admin/Mediaimage 3.png";
import img4 from "../../assets/Admin/Mediaimage 4.png";
import img5 from "../../assets/Admin/Mediasigiriya.png";
import img6 from "../../assets/Admin/Mediatott.png";
import img7 from "../../assets/Admin/daladamaligawa.png";

const MediaLibrary = () => {
  const folders = [
    "Central", "Southern", "Uva", "Eastern", "North Central", 
    "North Western", "Sabaragamuwa", "Northern", "Western"
  ];
  const [activeFolder, setActiveFolder] = useState("Central");

  const [images, setImages] = useState<string[]>([
    img7, img5, img6, img4, img1, img2, img7, img5, img6, img4, img1, img2
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newImages: string[] = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        newImages.push(url);
      }
    });

    if (newImages.length > 0) {
      setImages(prev => [...newImages, ...prev]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Reset input value so the same file can be selected again if needed
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full font-['Inter'] relative">
      {/* Hidden file input */}
      <input 
        type="file" 
        multiple 
        hidden 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
      />

      {/* Top Header / Breadcrumb */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <div className="text-sm text-gray-500 mb-2">
            Home &gt; Media Library
          </div>
          <h1 className="text-4xl font-bold font-serif text-[#2a2a2a] mb-2 tracking-tight">Media Library</h1>
          <p className="text-gray-500 text-sm">Manage all imagery across the heritage platform.</p>
        </div>
        
        {/* Upload Button */}
        <button 
          onClick={handleUploadClick}
          className="bg-[#1E4538] hover:bg-[#15342a] text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-colors"
        >
          Upload
          <FiUpload size={16} />
        </button>
      </div>

      {/* Folders Section */}
      <div className="mb-10 relative z-10">
        <h2 className="text-2xl font-bold font-serif text-[#2a2a2a] mb-4">Folders</h2>
        <div className="bg-white rounded-2xl py-4 px-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-4">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`font-serif text-lg px-2 py-1 transition-colors ${
                activeFolder === folder 
                  ? "text-[#1e1e1e] font-bold" 
                  : "text-[#2a2a2a] font-normal hover:text-gray-500"
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      {/* All Media Section */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-serif text-[#2a2a2a] mb-4">All Media</h2>
        
        {/* Drag & Drop Area */}
        <div 
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed rounded-xl py-6 flex flex-col items-center justify-center text-gray-500 mb-8 cursor-pointer transition-all duration-200 ${
            isDragging 
              ? "border-[#1E4538] bg-[#1E4538]/5" 
              : "border-gray-300 hover:bg-gray-50/50 bg-transparent"
          }`}
        >
          <div className="flex items-center gap-3">
             <FiUpload size={20} className={isDragging ? "text-[#1E4538]" : "text-gray-600"} />
             <p className={`text-sm font-medium ${isDragging ? "text-[#1E4538]" : "text-gray-600"}`}>
               {isDragging ? "Drop images here..." : "Drag & drop images here or click here to browse"}
             </p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pb-10">
          {images.map((img, index) => (
            <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={img} 
                alt={`Media item ${index}`} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
