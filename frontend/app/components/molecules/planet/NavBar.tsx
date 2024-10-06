import NavButton from '@/app/components/atoms/planet/NavButton';
import {NavBarWrapper} from "@/app/styles/planet"
import { IBM_Plex_Sans_KR } from 'next/font/google';

const ibm = IBM_Plex_Sans_KR({ weight: '500', subsets: ['latin'] })

interface NavBarProps {
  activeSection: string;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  sections: { name: string; ref: React.RefObject<HTMLDivElement> }[];
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, scrollToSection, sections }) => {
  return (
    <NavBarWrapper>
      {sections.map(({ name, ref }) => (
        <NavButton className={ibm.className} key={name} active={activeSection === name} onClick={() => scrollToSection(ref)}>
          {name}
        </NavButton>
      ))}
    </NavBarWrapper>
  );
};

export default NavBar;
