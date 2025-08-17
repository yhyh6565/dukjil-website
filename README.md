# 덕질로 배우는 비즈니스

K-POP, 마블, 엔터테인먼트 산업의 성공 사례를 통해 현실적이고 실용적인 비즈니스 전략을 탐구하는 개인 매거진 사이트입니다.

## 🎯 프로젝트 개요

- **타입**: 정적 웹사이트 (Static Website)
- **호스팅**: GitHub Pages
- **콘텐츠**: 29편의 비즈니스 인사이트 글 (예정)
- **카테고리**: SM Entertainment, MCU, 프로듀스 101

## 🏗️ 사이트 구조

```
dukjil-website/
├── index.html                 # 메인 페이지
├── categories/                # 카테고리 페이지들
│   ├── sm-entertainment.html
│   ├── mcu.html
│   └── produce101.html
├── articles/                  # 개별 글 페이지들
│   ├── fan-waiting.html
│   ├── netflix-vs-marvel.html
│   └── exo-universe.html
├── assets/                    # 정적 자원들
│   ├── css/
│   │   ├── main.css
│   │   ├── article.css
│   │   └── responsive.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── covers/
│       ├── categories/
│       └── icons/
├── data/
│   └── articles.json         # 글 메타데이터
└── README.md
```

## 🎨 디자인 컨셉

### 브랜드 컬러
- **SM Entertainment**: #ff6b6b (레드)
- **MCU**: #ed1d24 (마블 레드)  
- **프로듀스 101**: #4a90e2 (블루)
- **베이스**: #1a1a1a (다크), #f8f9fa (라이트)

### 타이포그래피
- **메인 폰트**: Noto Sans KR
- **액센트 폰트**: Inter
- **모바일 우선** 반응형 디자인

## 🔧 기술 스택

- **HTML5** (시맨틱 마크업)
- **CSS3** (Flexbox, Grid, CSS Variables)
- **Vanilla JavaScript** (ES6+)
- **Google Fonts** (웹폰트)

## 📱 주요 기능

### 현재 구현된 기능
- ✅ 반응형 네비게이션
- ✅ 카테고리별 페이지 분리
- ✅ 글 목록 및 상세 페이지
- ✅ 키워드 태그 시스템
- ✅ 모바일 최적화
- ✅ URL 복사 기능

### 향후 추가 예정
- [ ] 클라이언트 사이드 검색
- [ ] 다크모드 토글
- [ ] 읽기 진행률 표시
- [ ] Google Analytics 연동

## 🚀 GitHub Pages 배포

### 1. 저장소 설정
```bash
git init
git add .
git commit -m "Initial commit: 덕질로 배우는 비즈니스 웹사이트"
git branch -M main
git remote add origin https://github.com/username/dukjil-website.git
git push -u origin main
```

### 2. GitHub Pages 활성화
1. GitHub 저장소 → Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Save

### 3. 사이트 접속
- URL: `https://username.github.io/dukjil-website`
- 배포 완료까지 5-10분 소요

## 📝 콘텐츠 추가 방법

### 새 글 추가
1. `articles/` 폴더에 새 HTML 파일 생성
2. `data/articles.json`에 메타데이터 추가
3. 필요시 `index.html`과 카테고리 페이지 업데이트

### 샘플 글 구조
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>글 제목 - 덕질로 배우는 비즈니스</title>
    <!-- 메타 태그들 -->
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/article.css">
    <link rel="stylesheet" href="../assets/css/responsive.css">
</head>
<body>
    <!-- 네비게이션 -->
    <!-- 글 내용 -->
    <!-- 푸터 -->
    <script src="../assets/js/main.js"></script>
</body>
</html>
```

## 🎯 비즈니스 키워드

총 12개의 핵심 키워드를 통해 콘텐츠를 분류:

1. **안정성** - 지속 가능한 비즈니스 모델
2. **독점성** - 시장 내 고유 포지션
3. **굿즈** - 상품 기획과 수익 모델
4. **큰그림** - 장기적 비전과 전략
5. **세계관** - 브랜드 유니버스 구축
6. **원팀** - 조직 운영과 팀워크
7. **공간경험** - 경험 디자인
8. **인재** - 인재 발굴과 육성
9. **탈케이팝** - 글로벌 확장
10. **몰입설계** - 고객 경험 관리
11. **메시지** - 브랜딩과 커뮤니케이션
12. **수익구조** - 다각화된 수익 모델

## 📊 현재 상태

- **총 글 수**: 3개 (샘플)
- **카테고리**: 3개
- **반응형**: 완료
- **브라우저 호환성**: Modern browsers
- **성능 최적화**: 기본적 최적화 완료

## 🔄 업데이트 로그

### v1.0.0 (2025-08-17)
- 기본 웹사이트 구조 완성
- 샘플 콘텐츠 3개 추가
- 반응형 디자인 구현
- GitHub Pages 배포 준비 완료

## 📞 연락처

- **이메일**: contact@dukjil.com
- **GitHub**: [프로젝트 저장소](https://github.com/username/dukjil-website)

---

© 2025 덕질로 배우는 비즈니스. All rights reserved.