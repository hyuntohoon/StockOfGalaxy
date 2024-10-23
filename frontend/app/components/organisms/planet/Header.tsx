import Logo from '@/app/components/atoms/planet/Logo';
import StockInfo from '@/app/components/molecules/planet/StockInfo';
import { HeaderWrapper, HeaderContent } from '@/app/styles/planet';


const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo src="/logo.png" alt="Logo" />
        <StockInfo />
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
