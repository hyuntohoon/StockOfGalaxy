import { useEffect, RefObject } from 'react';

export const useWheelScroll = (
  contentRef: RefObject<HTMLDivElement>,
  sections: { name: string; ref: React.RefObject<HTMLDivElement> }[],
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void
) => {
  useEffect(() => {
    const handleWheelScroll = (event: WheelEvent) => {
        contentRef.current.scrollTo({
        left: contentRef.current.scrollLeft + event.deltaY * 300,
        behavior: "smooth",
        });

        setTimeout(() => {
        const { scrollLeft, clientWidth } = contentRef.current!;
        const scrollPosition = scrollLeft + clientWidth / 2;

        let closestSection = sections[0];
        let minDistance = Infinity;

        sections.forEach(({ name, ref }) => {
            if (ref.current) {
            const sectionLeft = ref.current.offsetLeft;
            const sectionWidth = ref.current.offsetWidth;
            const sectionCenter = sectionLeft + sectionWidth / 2;
            const distance = Math.abs(scrollPosition - sectionCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestSection = { name, ref };
            }
            }
        });

        if (closestSection.ref.current) {
            scrollToSection(closestSection.ref);
        }
        }, 1000);
    };

    if (contentRef.current) {
      contentRef.current.addEventListener('wheel', handleWheelScroll);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('wheel', handleWheelScroll);
      }
    };
  }, [contentRef, sections, scrollToSection]);
};
