
import { useState } from "react";
import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";

const Upload = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Resource</h1>
            <p className="text-gray-600 max-w-3xl">
              Share your study materials with the IIT Indore community. Uploaded resources will be available to all students.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
            <UploadForm />
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} IIT Indore Study Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Upload;
