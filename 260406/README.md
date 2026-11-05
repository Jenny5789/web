# CSS 레이아웃 실습 — float & position

> **질문** `float`과 `position`으로 다단 레이아웃을 직접 구현할 수 있을까?

> **답** 2단·3단 레이아웃을 `float`으로, 텍스트 배치를 `position: absolute`로 구현하고 카드 UI 퀴즈로 마무리했습니다.

CSS 레이아웃의 핵심인 `float`·`clear` 패턴과 `position` 속성을 실습한 수업 결과물.

---

## 기술 스택

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

---

## 학습 흐름

```
float 2단 레이아웃 ──▶ float 3단 레이아웃 ──▶ position 텍스트 배치 ──▶ 카드 UI 퀴즈
```

---

## 파일 구성

| 파일 | 주제 | 핵심 속성 |
|------|------|-----------|
| `2column-layout.html` | 2단 레이아웃 | `float: left`, `clear: both` |
| `3column-layout.html` | 3단 레이아웃 | `float: left` × 3분할 |
| `position-2.html` + `css/position-2.css` | 배경 이미지 위 텍스트 배치 | `position: relative/absolute` |
| `quiz-2.html` | 카드 UI 퀴즈 — 여가 코스 소개 | `float: left`, `border-radius` |
| `lab/lab.html` + `lab/css/poster.css` | 상품 소개 실습 — 레드향 포스터 | `float`, `table`, 외부 CSS |

---

## 주요 학습 내용

### float 레이아웃 구조

```
#wrapper
 ├── #header          (width: 100%)
 ├── #sidebar         (float: left)
 ├── #contents        (float: left)
 └── #footer          (clear: both)
```

3단은 `#sidebar-left` + `#contents` + `#sidebar-right` 세 블록을 모두 `float: left`로 배치.

### position 텍스트 배치

```css
#contents  { position: relative; }   /* 기준점 */
h1         { position: absolute;     /* 상대 이동 */
             right: 250px;
             bottom: 200px; }
```

배경 이미지(`background-size: cover`) 위에 텍스트를 절대 위치로 고정.

---

## 한계

- 고정 `px` 너비 사용 — 반응형 미지원
- `float` 기반 레이아웃 — Flexbox·Grid 전환 전 단계 실습 코드
