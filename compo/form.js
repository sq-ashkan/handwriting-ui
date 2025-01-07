import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Form() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    const loadingToast = toast.loading("Processing your image...");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post("/api/predict", formData);
      console.log("Frontend Response:", response.data);
      setPrediction(response.data);
      toast.success("Image processed successfully!", {
        id: loadingToast,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Upload failed", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      <div className="w-96 mx-auto z-50">
        <div className=" backdrop-blur-sm rounded-2xl border-2 border-white/50 p-8 shadow-xl flex justify-center items-center flex-col">
          <form onSubmit={handleSubmit} className="space-y-8 flex flex-col justify-center items-center h-44"> 
            <div className="">
           
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className=" flex justify-center items-center flex-col"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !selectedFile}
              className={`w-full py-4 px-6 rounded-xl font-medium text-lg 
                transition-all duration-200 transform hover:scale-[1.02] 
                active:scale-[0.98] shadow-md hover:shadow-lg ${
                  isLoading || !selectedFile
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
              {isLoading ? "Processing..." : "Upload Image"}
            </button>

            {prediction && (
              <div className="mt-6 p-5  /30 rounded-xl border border-white/50 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Detected:</span>
                  <span className="text-3xl font-bold text-blue-600">
                    {prediction.character}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Confidence:</span>
                  <div className="flex items-center">
                    <div className="w-36 h-3 bg-gray-200 rounded-full mr-3">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${prediction.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
