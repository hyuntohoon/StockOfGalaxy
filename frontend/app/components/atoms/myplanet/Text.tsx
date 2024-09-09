import styled from 'styled-components';

export const Text = styled.span<{ color?: string; size?: string; weight?: string }>`
  color: ${({ color }) => color || '#ffffff'};
  font-size: ${({ size }) => size || '16px'};
  font-weight: ${({ weight }) => weight || 'normal'};
`;

