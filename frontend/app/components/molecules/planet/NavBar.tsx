import NavButton from '@/app/components/atoms/planet/NavButton';
import {NavBarWrapper} from "@/app/styles/planet"
interface NavBarProps {
  activeSection: string;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  sections: { name: string; ref: React.RefObject<HTMLDivElement> }[];
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, scrollToSection, sections }) => {
  return (
    <NavBarWrapper>
      {sections.map(({ name, ref }) => (
        <NavButton key={name} active={activeSection === name} onClick={() => scrollToSection(ref)}>
          {name}
        </NavButton>
      ))}
    </NavBarWrapper>
  );
};

export default NavBar;
