import React from 'react';
import styled from 'styled-components';
import { FavoriteItem } from '../../molecules/myplanet/FavoriteItem';

interface FavoritesListProps {
  items: Array<{
    rank: number;
    name: string;
    price: string;
    change: string;
    isFavorite: boolean;
    iconSrc: string;
  }>;
  onToggleFavorite: (index: number) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FavoritesList: React.FC<FavoritesListProps> = ({ items, onToggleFavorite }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <FavoriteItem
          key={index}
          rank={item.rank}
          name={item.name}
          price={item.price}
          change={item.change}
          isFavorite={item.isFavorite}
          onToggleFavorite={() => onToggleFavorite(index)}
          iconSrc={item.iconSrc}
        />
      ))}
    </Container>
  );
};
