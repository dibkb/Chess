import { ModalBody, Slider } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import getCroppedImg from "../../utils/get-cropped-image.ts";
import Cropper, { Area, Point } from "react-easy-crop";
import styles from "./crop-image.ts";
import { compressImage } from "../../utils/resizer.ts";
interface CropProfilepic {
  imageUrl: string;
  setImageCropUrl: (res: string) => void;
}
function CropProfilepic({ imageUrl, setImageCropUrl }: CropProfilepic) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    const res = await getCroppedImg(imageUrl, croppedAreaPixels);
    if (typeof res === "string") {
      const cropped = await compressImage(res);
      setImageCropUrl(cropped);
    }
  };
  return (
    <ModalBody className="flex flex-col justify-center items-center">
      <div
        style={{
          ...styles.container,
        }}
      >
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <Slider
        size="sm"
        step={0.01}
        maxValue={10}
        minValue={1}
        aria-label="Temperature"
        defaultValue={1}
        onChange={(e) => {
          if (typeof e === "number") setZoom(e);
        }}
      />
    </ModalBody>
  );
}

export default CropProfilepic;
