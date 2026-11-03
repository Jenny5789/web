# HTML 기초 실습 — W3Schools

> **질문** HTML의 구조와 기본 태그를 직접 작성하며 익힐 수 있을까?

> **답** W3Schools 예제를 따라 요소·속성·제목·단락을 직접 코딩하며 HTML 문서 구조를 손에 익혔다.

W3Schools 튜토리얼 기반 HTML 기초 실습 파일 모음.

---

## 기술 스택

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)

---

## 학습 흐름

```
HTML 요소 구조 ──▶ 속성(href, src, alt, style) ──▶ 제목 태그 ──▶ 단락·줄바꿈·pre
```

---

## 파일 구성

| 파일 | 주제 | 핵심 태그 |
|------|------|-----------|
| `w3school_basic, elements.html` | HTML 문서 기본 구조 | `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, `<h1>`~`<h6>`, `<p>`, `<br>` |
| `w3school_attribute.html` | HTML 속성 | `href`, `src`, `alt`, `style`, `lang`, `title` |
| `w3school_heading.html` | 제목 태그 + style 속성 | `<h1>`~`<h6>`, `font-size` |
| `w3school_headings.html` | 제목 계층 구조 실습 | `<h1>` ~ `<h3>` |
| `w3school_paragraphs.html` | 단락·공백·줄바꿈 | `<p>`, `<hr>`, `<br>`, `<pre>` |

---

## 주요 학습 내용

### HTML 문서 기본 구조

```html
<!DOCTYPE html>
<html>
  <head><title>Page Title</title></head>
  <body>
    <h1>Heading</h1>
    <p>Paragraph</p>
  </body>
</html>
```

### 핵심 속성 요약

| 속성 | 설명 | 예시 |
|------|------|------|
| `href` | 링크 주소 | `<a href="https://...">` |
| `src` | 이미지 경로 | `<img src="photo.jpg">` |
| `alt` | 이미지 대체 텍스트 | `<img alt="설명">` |
| `style` | 인라인 스타일 | `<p style="color:red;">` |
| `title` | 툴팁 텍스트 | `<p title="tooltip">` |

### `<pre>` vs `<p>` 공백 처리

```
<p>  : 연속 공백·줄바꿈 무시 → 브라우저가 재정렬
<pre>: 소스 그대로 출력 → 들여쓰기·줄바꿈 보존
```
