import ImgRecognizer from "../components/ImgRecognizer.js";
import ParticlesCom from "../components/ParticlesCom.js";

const ImageUploader = () => {
  return (
    <div className="p-6 bg-gradient-to-tr  from-[#845ec2] via-[#0091ff] to-[#12eb54] w-full h-screen flex flex-col justify-center items-center">
      <ImgRecognizer />
      <ParticlesCom />
    </div>
  );
};

export default ImageUploader;
