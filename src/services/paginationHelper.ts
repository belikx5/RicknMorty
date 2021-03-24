export const createPages = (
  pagesCount: number,
  currentPage: number
): number[] => {
  const availablePages: number[] = [];
  if (pagesCount > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        availablePages.push(i);
        if (i === pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        availablePages.push(i);
        if (i === pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      availablePages.push(i);
    }
  }
  return availablePages;
};
