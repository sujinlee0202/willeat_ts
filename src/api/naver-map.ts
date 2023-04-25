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
  const center: naver.maps.LatLng = new naver.maps.LatLng(x, y);
  let mapDiv = new naver.maps.Map('map', {
    center: center,
    zoom: 19,
  })

  let mapMarker = new naver.maps.Marker({
    position: center,
    map: mapDiv
  })
}

export const clickPlaceMap = async (x: number, y: number) => {
  const center: naver.maps.LatLng = new naver.maps.LatLng(x, y);

  let mapDiv = new naver.maps.Map('map', {
    center: center,
    zoom: 16,
  })

  let mapMarker = new naver.maps.Marker({
    position: center,
    map: mapDiv
  })

  // 지도의 중심점을 왼쪽으로 이동시키기
  const newCenter = new naver.maps.LatLng(x, y - 0.005);
  mapDiv.setCenter(newCenter);
}