import Image from "next/image";
import { useState } from "react";
import styled from "@emotion/styled";

interface ImageProps {
    alt: string;
    src: string;
    width: number;
    height: number;
}

// Styled Component for the Image with border-radius
const StyledImage = styled(Image)`
    border-radius: 8px; // 원하는 border-radius 값 설정
    margin-right: 8px;
`;

export default function ImgWithFallback({ alt, src, height, width }: ImageProps) {
    const [isImgError, setIsImgError] = useState<boolean>(false);
    const defaultImage = '/images/default.jpg';
    const effectiveSrc = isImgError || src === "이미지 없음" ? defaultImage : src;

    return (
        <StyledImage
            alt={alt}
            src={effectiveSrc}
            width={width}
            height={height}
            onError={() => setIsImgError(true)}
        />
    );
}
