import calculateDistance from './calculateDistance';
function isWithinDistance(location1, location2, selectedDistance) {
  const distance = calculateDistance(location1, location2);
  return distance <= selectedDistance * 1000;
}
export default isWithinDistance;
