import { useState } from "react";
import Form from "../../compo/form";
import ParticlesCom from "../../compo/ParticlesCom";

const ImageUploader = () => {
  return (
    <>
      <div className="p-6 bg-gradient-to-tr  from-[#845ec2] via-[#0091ff] to-[#12eb54] w-full h-screen flex justify-center items-center">
        <div className="z-30 h-64 flex flex-col justify-center items-center p-12 bg-white rounded-3xl bg-opacity-25">
          <Form />
        </div>
      </div>
      <ParticlesCom />
    </>
  );
};

export default ImageUploader;
