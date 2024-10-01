import React from 'react';

interface NavBarProps {
  activeSection: string;
  sections: { name: string; ref: React.RefObject<HTMLDivElement> }[];
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  activeSection,
  sections,
  scrollToSection,
}) => {
  return (
    <nav>
      {sections.map(({ name, ref }) => (
        <button
          key={name}
          className={activeSection === name ? 'active' : ''}
          onClick={() => scrollToSection(ref)}
        >
          {name}
        </button>
      ))}
    </nav>
  );
};

export default NavBar;
