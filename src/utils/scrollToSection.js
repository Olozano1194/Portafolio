export const scrollToSection = (id) => {
    const element = document.getElementById(id);
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