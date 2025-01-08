/**
 * @author   Ashkan Sadri Ghamshi
 * @project  Character Recognition Web App
 * @course   HAWK University - Computer Science
 * @version  1.0.0
 * @since    January 2025
 */

import ImgRecognizer from "../components/ImgRecognizer.js";
import ParticlesCom from "../components/ParticlesCom.js";

const ImageUploader = () => {
  return (
    <div className="p-6 md:p-8 bg-gradient-to-tr from-[#845ec2] via-[#0091ff] to-[#12eb54] w-full min-h-screen flex flex-col justify-center items-center overflow-y-auto">
      <ImgRecognizer />
      <ParticlesCom />
    </div>
  );
};

export default ImageUploader;
