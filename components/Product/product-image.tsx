"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { cn } from "@/utils/classnames";

// Tiny base64 placeholder for blur effect
const PLACEHOLDER_BASE64 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAMYAAAAAAIAAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFhaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcUDQwNFxsUEBAWIxsdFxkZGxsdHxsdHR0fHx8mIh4eIx8dHSMjJCUlLDQvLzw0NUBEREpNNf/bAEMBFxcXHhoeNBweNUEmITVRRU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTf/AABEIAAYACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlgAH/9k=";

type ProductImageProps = {
  image?: Product["image"];
  title?: Product["title"];
  hasHover?: boolean;
};

const ProductImage = ({ image, title, hasHover = true }: ProductImageProps) => {
  const [errorImage, setErrorImage] = useState(false);
  const errorImageUrl = "/no-image-placeholder.svg";

  const imgUrl = () => {
    if (errorImage) {
      return errorImageUrl;
    }

    if (!image) {
      return errorImageUrl;
    }

    return image;
  };

  const imageClassName = cn("object-contain transition-all duration-300", {
    "grayscale group-hover:grayscale-0 group-hover:scale-105": hasHover,
  });

  return (
    <div className="relative w-full aspect-square overflow-hidden">
      <Image
        className={imageClassName}
        src={imgUrl()}
        alt={title || "Product image"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={PLACEHOLDER_BASE64}
        onError={() => setErrorImage(true)}
      />
    </div>
  );
};

export default ProductImage;
