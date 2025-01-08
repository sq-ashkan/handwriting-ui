import React, { useState } from "react";
import { Upload } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function ImgRecognizer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
      console.log("Selected file:", file);
    }
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
    <div className="z-10">
      <Toaster position="top-center" />
      <div className="w-96 mx-auto z-50">
        <div className="backdrop-blur-sm rounded-2xl border border-white/50 p-8 shadow-xl flex justify-center items-center flex-col">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 flex flex-col justify-center items-center w-full"
          >
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="relative w-full flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-white/50 rounded-lg cursor-pointer bg-white/10 hover:bg-white/20 transition-all duration-200 overflow-hidden"
                >
                  {previewUrl ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-contain p-2"
                      />
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="text-white text-xs bg-black/50 px-2 py-1 rounded">
                          {selectedFile.name}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-white mb-2" />
                      <span className="text-white text-sm">Choose an image</span>
                    </>
                  )}
                </label>
              </div>
              <button
                type="submit"
                disabled={isLoading || !selectedFile}
                className="w-full py-3 px-6 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Start Recognising"}
              </button>
              <div className="text-xs flex justify-center items-center w-full text-center text-white/80"> 
                Ashkan Sadri Ghamshi <br /> HAWK 2025 - made with love ❤️
              </div>
            </div>

            {prediction && (
              <div className="mt-6 p-5 rounded-xl border border-white/50 space-y-4 w-full bg-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Detected:</span>
                  <span className="text-3xl font-bold text-white">
                    {prediction.character}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Confidence:</span>
                  <div className="flex items-center">
                    <div className="w-36 h-3 bg-white/20 rounded-full mr-3">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${prediction.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white">
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