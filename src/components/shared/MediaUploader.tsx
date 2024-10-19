import { useToast } from "@/hooks/use-toast"
import { getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  image: any;
  publicId: string;
  type: string;
}

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type
}: MediaUploaderProps) => {
  const { toast } = useToast()

  const onUploadSuccessHandler = (result: any) => {
    toast({
      title: 'Image uploaded successfully',
      description: '1 credit was deducted from your account',
      duration: 5000,
      className: 'success-toast',
    })
  }
  const onUploadErrorHandler = () => {
    toast({
      title: 'Something went wrong while uploading',
      description: 'Please try again',
      duration: 5000,
      className: 'error-toast',
    })
  }
  return (

    <CldUploadWidget
      uploadPreset="picgenie"
      options={{
        multiple: false,
        resourceType: "image"
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => {
        return (
          <div className="flex flex-col gap-4" >
            <h3 className="h3-bold text-dark-600">Original</h3>
            {publicId ? (
              <>
                <div className="cursor-pointer overflow-hidden rounded-[10px]">
                  <CldImage 
                  width={getImageSize(type, image, "width")}
                  width={getImageSize(type, image, "width")}


                  />
                </div>
              </>
            ) : (
              <div className="media-uploader_cta"
                onClick={() => open()}
              >
                <div className="media-uploader_cta-image">
                  <Image
                    src="/assets/icons/add.svg"
                    alt="Add image"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="p-14-medium">Click here to upload image</p>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  )
}

export default MediaUploader