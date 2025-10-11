import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdClose, MdImage, MdCameraAlt } from "react-icons/md";
import { useAppSelector } from "../store/store";
import {
  useUploadImageToCloudinaryMutation,
  useCreatePostMutation,
} from "../store/features/api/apiSlice";

const CreatePost = ({
  onSuccess,
  currentUserAvatar = "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
}: {
  onSuccess?: () => void;
  currentUserAvatar?: string;
}) => {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const userId = useAppSelector((state) => state.user.user?.id);
  const toast = useToast();

  const [uploadImageToCloudinary] = useUploadImageToCloudinaryMutation();
  const [createPost] = useCreatePostMutation();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setCaption("");
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage || !caption.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please add both an image and caption",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload image to Cloudinary
      const uploadResult = await uploadImageToCloudinary(
        selectedImage
      ).unwrap();

      // Create post with the uploaded image URL
      await createPost({
        caption: caption.trim(),
        imageUrl: uploadResult.url,
      }).unwrap();

      toast({
        title: "Post created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      resetForm();
      onSuccess?.();
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast({
        title: "Failed to create post",
        description:
          error?.data?.message || "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box width="100%">
      <Flex gap={3} align="start">
        <Avatar size="md" name="current_user" src={currentUserAvatar} />

        <Box flex="1">
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Share your clicks"
            bg="gray.100"
            borderRadius="xl"
            border="none"
            resize="none"
            minH="120px"
            fontSize="md"
            _placeholder={{ color: "gray.400" }}
            _hover={{
              bg: "gray.150",
            }}
            _focus={{
              bg: "white",
              borderColor: "vistagram.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-vistagram-500)",
            }}
          />

          {/* Image Preview */}
          {imagePreview && (
            <Box position="relative" mt={3}>
              <Image
                src={imagePreview}
                alt="Preview"
                maxH="200px"
                w="100%"
                objectFit="cover"
                borderRadius="lg"
              />
              <IconButton
                aria-label="Remove image"
                icon={<MdClose size={16} />}
                size="sm"
                position="absolute"
                top={2}
                right={2}
                bg="blackAlpha.600"
                color="white"
                _hover={{ bg: "blackAlpha.700" }}
                onClick={handleRemoveImage}
              />
            </Box>
          )}

          {/* Hidden file inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />

          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleImageChange}
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
          />

          <Flex justify="space-between" align="center" mt={3}>
            <Flex gap={2}>
              <IconButton
                aria-label="Add image from gallery"
                icon={<MdImage size={20} />}
                variant="ghost"
                colorScheme="vistagram"
                size="sm"
                onClick={handleImageClick}
              />

              <IconButton
                aria-label="Take photo with camera"
                icon={<MdCameraAlt size={20} />}
                variant="ghost"
                colorScheme="vistagram"
                size="sm"
                onClick={handleCameraClick}
              />
            </Flex>

            <Button
              colorScheme="vistagram"
              size="sm"
              borderRadius="full"
              px={6}
              isDisabled={!selectedImage || !caption.trim() || isUploading}
              isLoading={isUploading}
              loadingText="Posting..."
              onClick={handleSubmit}
            >
              Post
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export { CreatePost };
