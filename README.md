# willeat_ts
## 개요
운영자가 선택한 맛집 리스트 제공 사이트

## 기능
- firebase를 이용한 데이터베이스 저장 및 구글 로그인 기능 구현
- admin기능 구현 -> admin만 firebase에 데이터 추가 가능
- cloudinary를 이용한 이미지 저장
- 네이버 검색 api를 이용해 장소 검색 (운영자가 장소를 추가할 때 사용)
- 현재위치를 기반으로 네이버 지도 api를 이용해 지도 표시
- 맛집 카드 클릭 시 맛집 위치 표시

## 사용 기술
- Naver Open API (Map, Search)
- Tmap Open API (Convert Coord)
- firebase, cloudinary
- HTML, TypeScript
- React, Tailwind CSS, Axios
- React-icons, uuid

## 실행 방법
```
npm install
npm run dev
```

## 파일 구조
```
├─ public  
├─ src   
│  ├─ api   
│  │  ├─ cloudinary.ts
│  │  ├─ firebase.ts
│  │  ├─ naver-map.ts  
│  │  ├─ naver-search.ts  
│  │  └─ tmap.ts
│  ├─ assets
│  ├─ components  
│  │  ├─ ImageCarousel
│  │  ├─ Login
│  │  ├─ PlaceCard
│  │  ├─ PlaceDetail
│  │  └─ Sidebar  
│  ├─ context  
│  │  └─ loginContext.tsx  
│  ├─ layout
│  │  ├─ Loading
│  │  └─ LoginLayout
│  ├─ pages
│  │  ├─ addnewplace
│  │  │  ├─ AddPlaceForm.tsx
│  │  │  └─ index.tsx
│  │  ├─ home
│  │  ├─ MainPage
│  │  └─ SearchPlacePage
│  ├─ types
│  │  ├─ Place.ts
│  │  └─ User.ts
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ router.tsx
├─ index.html
├─ README.md
├─ vite.config.js
```
## 세부사항
### src/api
- cloudinary.ts : cloudinary api. cloudinary에 image 저장
- firebase.ts : firebase api. firebase login 및 database 관련 api 포함
- naver-map.ts : naver map api. 네이버 지도 표시
- naver-search.ts : naver search api. 맛집 추가 시 위치 검색 기능
- tmap.js : tmap api. naver search api에서 받아온 위치를 naver map api에서 사용할 수 있도록 변환

### src/components
- ImageCarousel : 이미지 캐러샐 컴포넌트
- Login : Google Login / Logout 기능
- PlaceCard : 사이드바에 표시되는 맛집 카드
- PlaceDetail : PlaceCard 선택 시 나타나는 Detail 컴포넌트
- SideBar : 내 주변 맛집들이 표시되는 사이드바 컴포넌트

### src/context
- loginContext : login 상태를 앱 전반에 사용하기 위한 context

### src/layout
- Loading : 맛집 추가 시 loading중임을 알려주는 레이아웃
- LoginLayout : admin 계정만 맛집 추가 페이지에 접근할 수 있도록 Layout 구성

### src/pages
- addnewplace : admin 전용 맛집 추가 페이지
- home : 메인 페이지
- MainPage : 메인 페이지의 현재 위치 기반 지도 표시
- SearchPlacePage : PlaceCard 선택 시 나오는 페이지

### src/router.tsx
라우터 작성

