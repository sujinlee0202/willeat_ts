import { convertGeo } from "./tmap";

export const initMap = (lat: number, lon: number) => {
  let map: naver.maps.Map;
  const center: naver.maps.LatLng = new naver.maps.LatLng(lat, lon);
  
  map = new naver.maps.Map('map', {
      center: center,
      zoom: 16
  });
}

export const searchMap = async (x: number, y: number) => {
  let convertX = 0, convertY = 0

  await convertGeo(x, y)
  .then(res => Object.values(res.data)[0])
  .then((coord: any) => {
    convertX = coord.lat
    convertY = coord.lon
    return {convertX, convertY}
  })

  const center: naver.maps.LatLng = new naver.maps.LatLng(convertX, convertY);
  let mapDiv = new naver.maps.Map('map', {
    center: center,
    zoom: 19,
  })

  let mapMarker = new naver.maps.Marker({
    position: center,
    map: mapDiv
  })
}