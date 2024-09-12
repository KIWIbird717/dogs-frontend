// Функция для генерации случайной позиции
export const getRandomPosition = (
  containerWidth: number,
  containerHeight: number,
  elementWidth: number,
  elementHeight: number,
  excludedAreaPercentage: number = 0.7, // % от ширины и высоты, которые нужно исключить
) => {
  const maxX = containerWidth - elementWidth;
  const maxY = containerHeight - elementHeight;

  // Центральный квадрат, который нужно исключить
  const excludedWidth = containerWidth * excludedAreaPercentage;
  const excludedHeight = containerHeight * excludedAreaPercentage;

  const excludedStartX = (containerWidth - excludedWidth) / 2;
  const excludedEndX = excludedStartX + excludedWidth;

  const excludedStartY = (containerHeight - excludedHeight) / 2;
  const excludedEndY = excludedStartY + excludedHeight;

  let randomX, randomY;

  do {
    randomX = Math.random() * maxX;
    randomY = Math.random() * maxY;
  } while (
    randomX > excludedStartX &&
    randomX < excludedEndX &&
    randomY > excludedStartY &&
    randomY < excludedEndY
  );

  return { top: randomY, left: randomX };
};
