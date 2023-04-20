export const initMap = (lat: number, lon: number) => {
  let map: naver.maps.Map;
  const center: naver.maps.LatLng = new naver.maps.LatLng(lat, lon);
  
  map = new naver.maps.Map('map', {
      center: center,
      zoom: 16
  });
}