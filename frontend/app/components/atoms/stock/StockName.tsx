"use client";

import { useAccessToken } from "@/app/store/userSlice";
import styled from "@emotion/styled";
import Image from "next/image";
import { FavoriteButton, FavoriteIconWrapper } from "@/app/styles/myplanet";
import like from "@/public/images/myplanet/like.png";
import unlike from "@/public/images/myplanet/unlike.png";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  addMyPlanet,
  deleteMyPlanet,
  getMyPlanet,
} from "@/app/utils/apis/myplanet";
import anime from "animejs";
import { useIsLoggedIn } from "@/app/store/userSlice";

interface FontSize {
  $fontSize: number;
}

interface StockNameProps {
  koreanName?: string;
  fontSize?: number;
}

const Container = styled.div<FontSize>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${(props) => `${props.$fontSize}px`};
`;

const StyledImage = styled(Image)`
  margin-left: 5px;
  cursor: pointer;
`;

const StockName = ({ koreanName, fontSize = 15 }: StockNameProps) => {
  const { isLoggedIn } = useIsLoggedIn();
  const { accessToken, setAccessToken } = useAccessToken();
  const { stock } = useParams();
  const stock_code = Array.isArray(stock) ? stock[0] : stock ?? "005930";
  const [isFavorite, setIsFavorite] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchMyPlanet = async () => {
      const myPlanet = await getMyPlanet(accessToken, setAccessToken);
      console.log("myPlanet", myPlanet);
      const isFavorite = myPlanet.some(
        (planet) => planet.stockCode === stock_code
      );
      setIsFavorite(isFavorite);
    };

    fetchMyPlanet();
  }, []);

  const handleToggleFavorite = () => {
    const card = document.querySelector(`.card`);

    if (!isFavorite) {
      addMyPlanet(accessToken, setAccessToken, stock_code);
    } else {
      deleteMyPlanet(accessToken, setAccessToken, stock_code);
    }

    if (!playing) {
      setPlaying(true);
      anime({
        targets: card,
        scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 100 }],
        rotateY: { value: "+=180", delay: 100 },
        easing: "easeInOutSine",
        duration: 200,
        complete: function (anim) {
          setPlaying(false);
          setIsFavorite(!isFavorite);
        },
      });
    }
  };

  return (
    <Container $fontSize={fontSize}>
      {koreanName}
      {fontSize !== 15 && isLoggedIn === true && (
        <FavoriteButton
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavorite();
          }}
        >
          <FavoriteIconWrapper isFavorite={isFavorite}>
            <div className="card-container">
              <div className={`card`}>
                <div className="front">
                  <Image
                    src={like}
                    alt="Favorite Toggle"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="back">
                  <Image
                    src={unlike}
                    alt="Favorite Toggle"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
          </FavoriteIconWrapper>
        </FavoriteButton>
      )}
    </Container>
  );
};

export default StockName;
