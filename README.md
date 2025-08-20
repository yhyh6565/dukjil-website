# 덕질로 배우는 비즈니스

K-POP, 마블, 엔터테인먼트 산업의 성공 사례를 통해 현실적이고 실용적인 비즈니스 전략을 탐구하는 개인 매거진 사이트입니다.

## 🎯 프로젝트 개요

- **타입**: 정적 웹사이트 (Static Website)
- **호스팅**: GitHub Pages
- **URL**: https://yhyh6565.github.io/dukjil-website
- **콘텐츠**: 29편의 비즈니스 인사이트 글 (완료)
- **카테고리**: SM Entertainment (19개), MCU (6개), 프로듀스 101 (2개)
- **원본 자료**: Notion 블로그에서 마이그레이션

## 🏗️ 사이트 구조

```
dukjil-website/
├── index.html                    # 메인 페이지 (동적 글 로딩)
├── categories/                   # 카테고리 페이지들
│   ├── sm-entertainment.html
│   ├── mcu.html
│   └── produce101.html
├── articles/                     # 29개 개별 글 페이지들
│   ├── fandom-stability-1.html
│   ├── sm-big-picture.html
│   ├── marvel-27billion-harvest.html
│   ├── limited-edition-idol.html
│   └── ... (총 29개)
├── assets/                       # 정적 자원들
│   ├── css/
│   │   ├── main.css
│   │   ├── article.css
│   │   └── responsive.css
│   ├── js/
│   │   └── main.js              # 동적 필터링 & 글 로딩
│   └── images/
│       ├── covers/              # 글 표지 이미지들
│       ├── categories/          # 카테고리 아이콘들
│       └── source-articles/     # 본문 이미지들 (136개)
│           └── dukjil-writings/
├── data/
│   └── articles.json           # 29개 글 메타데이터 (LinkedIn 날짜 적용)
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
- **Vanilla JavaScript** (ES6+, Fetch API)
- **JSON** (데이터 관리)
- **Google Fonts** (웹폰트)

## 📱 주요 기능

### ✅ 현재 구현된 기능
- **동적 콘텐츠 로딩**: articles.json에서 29개 글 자동 로드
- **Notion 스타일 필터링**: 카테고리별 + 키워드별 실시간 필터
- **브라우저 히스토리 관리**: 뒤로가기 시 필터 상태 초기화
- **반응형 네비게이션**: 모바일 햄버거 메뉴
- **이미지 최적화**: 136개 이미지 파일 관리
- **LinkedIn 업로드 날짜**: 실제 게시일 반영 (2025.03.18 ~ 2025.05.22)
- **URL 복사 기능**: 글 공유하기
- **스크롤 투 탑**: 긴 글 목록 네비게이션

### 🔮 향후 추가 예정
- [ ] 클라이언트 사이드 검색
- [ ] 다크모드 토글
- [ ] 읽기 진행률 표시
- [ ] Google Analytics 연동
- [ ] 관련 글 추천 시스템

## 🎯 비즈니스 키워드 체계

총 11개의 핵심 키워드로 콘텐츠 분류:

### SM Entertainment (19개 글)
1. **안정성** (3개) - 팬덤 안정성과 리스크 관리
2. **독점성** (2개) - 플랫폼 독점과 소통 전략
3. **굿즈** (3개) - 포토카드, 인형, 앨범 수익화
4. **몰입설계** (2개) - 팬 경험과 기대감 관리
5. **세계관** (3개) - EXO 세계관, IP 확장
6. **공간경험** (2개) - 아티움, 팝업 전략
7. **인재** (1개) - SM Rookies 시스템
8. **브랜드** (2개) - SM깔, 브랜딩 전략
9. **기타** - NCT유닛전략, 큰그림, 수익모델 등

### MCU (6개 글)
1. **큰그림** (2개) - 장기 전략과 페이즈 계획
2. **세계관전략** (1개) - 연결된 유니버스
3. **스포일러마케팅** (1개) - 정보 공개 전략
4. **캐릭터브랜딩** (1개) - 캐릭터 기반 브랜딩
5. **수익구조** (1개) - 플랫폼별 수익 모델

### 프로듀스 101 (2개 글)
1. **팬참여형** (1개) - 투표 시스템
2. **희소성전략** (1개) - 한정판 아이돌

## 🚀 배포 및 업데이트

### GitHub Pages 자동 배포
```bash
# 변경사항 커밋 & 푸시시 자동 배포
git add .
git commit -m "Update content"
git push origin main
# 약 2-3분 후 https://yhyh6565.github.io/dukjil-website 업데이트
```

### 콘텐츠 업데이트 방법
1. **새 글 추가**: 
   - `articles/` 폴더에 HTML 파일 생성
   - `data/articles.json`에 메타데이터 추가
   - 이미지는 `assets/images/source-articles/` 구조 유지

2. **필터 키워드 추가**:
   - `articles.json`의 `keywords` 배열에 추가
   - 자동으로 UI에 반영됨

## 📊 콘텐츠 현황

### 글 분포
- **SM Entertainment**: 19개 (66%)
- **MCU**: 6개 (21%) 
- **프로듀스 101**: 2개 (7%)
- **기타**: 2개 (6%)

### 발행 날짜
- **최신**: 2025년 5월 22일 (11%의 데뷔 확률, 1.5년의 활동)
- **최초**: 2025년 3월 18일 (팬덤은 안정적인 덕질을 원한다)
- **총 기간**: 2개월간 집중 발행

### 이미지 자료
- **총 이미지**: 136개
- **표지 이미지**: 29개 (각 글마다)
- **본문 이미지**: 107개 (글 내용 삽화)

## 🔄 주요 업데이트 로그

### v2.0.0 (2025-08-20) - 메이저 업데이트
- ✅ 29개 모든 글 업로드 완료 (Notion → HTML 변환)
- ✅ articles.json 데이터베이스 구축
- ✅ 동적 글 로딩 시스템 구현
- ✅ LinkedIn 실제 업로드 날짜 반영
- ✅ 브라우저 뒤로가기 필터 문제 해결
- ✅ 136개 이미지 파일 최적화 배치

### v1.0.0 (2025-08-17) - 초기 버전
- 기본 웹사이트 구조 완성
- 샘플 콘텐츠 3개 추가
- 반응형 디자인 구현
- GitHub Pages 배포 준비 완료

## 🛠️ 개발 환경

### 요구사항
- Modern web browser (ES6+ 지원)
- GitHub Pages 호스팅
- 인터넷 연결 (Google Fonts)

### 로컬 개발
```bash
# 정적 파일 서버 실행 (Python 3)
python -m http.server 8000

# 또는 Node.js serve
npx serve .

# 브라우저에서 http://localhost:8000 접속
```

## 📧 연락처

- **작성자**: Yeonhee Do
- **이메일**: yeonheedo1127@gmail.com
- **LinkedIn**: https://linkedin.com/in/yeonhee-do-7283801a5
- **GitHub**: https://github.com/yhyh6565/dukjil-website

---

© 2025 덕질로 배우는 비즈니스. All rights reserved.