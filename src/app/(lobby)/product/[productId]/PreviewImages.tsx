import Image from "next/image";
import { FC } from "react";

interface PreviewImagesProps { }

const PreviewImages: FC<PreviewImagesProps> = ({ }) => {
  return (
    <div className="flex flex-col gap-y-3">
      <Image
        className="w-[550px] h-[550px] rounded-lg"
        width={600}
        height={600}
        src="/images/clothes.jpeg"
        alt="images"
      />
      <div className="flex justify-center gap-3">
        <Image
          className="w-40 h-40 rounded-lg"
          width={200}
          height={200}
          src="/images/clothes.jpeg"
          alt="images"
        />
        <Image
          className="w-40 h-40 rounded-lg"
          width={200}
          height={200}
          src="/images/clothes.jpeg"
          alt="images"
        />
        <Image
          className="w-40 h-40 rounded-lg"
          width={200}
          height={200}
          src="/images/clothes.jpeg"
          alt="images"
        />


      </div>


    </div>
  );
};

export default PreviewImages;
