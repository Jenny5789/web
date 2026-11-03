# 산책 ON — 서울·제주 산책 코스 가이드

> **질문** 지역과 조건을 선택하면 서울·제주 산책 코스와 날씨를 한 화면에서 확인할 수 있을까?

> **답** 카카오맵 API와 기상청 단기·중기예보 API를 연동해 코스 검색·지도·날씨·음식 정보를 한 페이지에서 제공하는 웹 서비스를 구현했다.

조건 필터로 원하는 코스를 찾고, 카카오맵으로 위치를 확인하고, 기상청 API로 7일 날씨를 조회하는 서울·제주 산책 가이드

---

## 기술 스택 및 역량

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)

| 역량 | 내용 |
|------|------|
| 컴포넌트 분리 구조 | `index.html`을 쉘로 두고 `loader.js`가 `html/` 폴더의 컴포넌트를 fetch로 조립 |
| 카카오맵 API 연동 | 코스별 마커·오버레이·경로 표시, 지역 전환 시 지도 재초기화 |
| 기상청 API 파싱 | 단기예보(0~3일) + 중기예보(4~7일) 병합으로 7일 예보 구성, 기상특보 조회 |
| Python 백엔드 | 표준 라이브러리(`http.server`)만으로 정적 파일 서빙 + API 프록시 구현 |
| 조건 검색 필터 | 지역·테마·시간·난이도 조건을 조합해 코스 목록 동적 렌더링 |
| 슬라이더 캐러셀 | 순수 JS로 자동재생·터치 스와이프·점 인디케이터 구현 |

---

## 서비스 흐름

```
지역 선택(서울/제주) ──▶ 조건 필터 ──▶ 코스 목록 출력 ──▶ 카카오맵 위치 확인 ──▶ 날씨·맛집 정보 조회
```

---

## 주요 기능

| 기능 | 내용 |
|------|------|
| 코스 검색 | 지역·테마·소요시간·난이도 조건 필터링 |
| 카카오맵 연동 | 코스별 마커·오버레이·경로 표시 |
| 7일 날씨 | 기상청 단기예보 + 중기예보 병합 출력 |
| 기상특보 | 태풍·호우·대설·강풍 특보 실시간 조회 |
| 맛집 정보 | 지역별 대표 음식·카페 이미지 슬라이더 |
| 리뷰 섹션 | 코스별 방문 후기 표시 |

---

## 폴더 구조

```
korea_travel/
├── index.html              # 진입점 — 빈 플레이스홀더 쉘
├── server.py               # Python 로컬 서버 (정적 파일 + 날씨 API 프록시)
├── 날씨서버_실행.bat
├── html/                   # UI 컴포넌트 (loader.js가 fetch로 주입)
│   ├── topbar.html         # 상단 네비게이션
│   ├── hero.html           # 메인 히어로 배너
│   ├── finder.html         # 코스 검색 필터
│   ├── finder_result.html  # 검색 결과 목록
│   ├── slider.html         # 사진 슬라이더
│   ├── map.html            # 카카오맵
│   ├── overlay.html        # 팝업 모달
│   └── footer.html
├── js/
│   ├── loader.js           # 컴포넌트 주입 & 앱 초기화
│   ├── script.js           # 날씨 출력
│   ├── kakao_map.js        # 카카오맵 마커·오버레이
│   ├── naver_map.js        # 네이버맵 연동
│   ├── courses.js          # 코스 데이터 & 필터 로직
│   ├── finder_result.js    # 검색 결과 렌더링
│   ├── reviews.js          # 리뷰 데이터
│   └── about.js            # 지역 소개
├── css/
│   ├── style.css
│   └── base.css
└── images/                 # 코스·음식·지도 이미지
```

---

## 실행 방법

**1. 날씨 서버 실행**

```bash
python server.py
```

또는 `날씨서버_실행.bat` 더블클릭

**2. 브라우저 접속**

```
http://localhost:8000
```

> 날씨 기능 사용 시 [공공데이터포털](https://www.data.go.kr)에서 기상청 단기예보 API 키 발급 후 `server.py`의 `SERVICE_KEY`에 입력 필요

---

## 한계

- 기상청 API 키가 없으면 날씨 기능 비활성 (코스 검색·지도는 정상 동작)
- 카카오맵 API 키가 하드코딩되어 있어 배포 환경에서 도메인 등록 필요
- 코스 데이터가 JS 파일에 정적으로 정의되어 있어 데이터 추가 시 코드 수정 필요
- Python 내장 서버(`SimpleHTTPServer`) 사용으로 동시 접속 처리에 한계

---

## 회고

HTML·CSS·JS 기초를 익힌 후 처음으로 외부 API를 연동한 멀티 컴포넌트 구성의 웹 프로젝트.

과정에서 체감한 점:
- 단일 `index.html`에 모든 코드를 넣지 않고 컴포넌트 분리 후 `fetch`로 조립하는 구조로 유지보수성 향상
- 기상청 API는 응답 포맷이 복잡해 단기·중기예보를 파싱·병합하는 Python 백엔드가 필요했음
- 지도 API 초기화 타이밍과 컴포넌트 로드 순서를 맞추는 것이 예상보다 까다로웠음
