/**
 * Smoothly scrolls to a section by ID with header offset
 * @param sectionId - The ID of the target element
 */
export const scrollToSection = (sectionId: string): void => {
  const element: HTMLElement | null = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 64; // altura de tu header fijo (ajusta si cambias h-16)
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};