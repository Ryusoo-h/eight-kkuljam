# 에잇꿀쟘
 : 8시간 꿀잠을 자는 바른생활을 지켜보자는 마음으로 만들기 시작함!
- React와 TS 연습하고 싶었음
- 이왕이면 사용하기 좋고 재밌는거 만들고 싶었음
- CRUD 연습하기.. TODO list말고 만들게 뭐있을까 고민중 미니게임 만들려다가 미니게임은 UI고민을 많이해야되서 간단한걸로 결정. 디자인이 중한게 아니라 코딩연습이 필요한거라..

## 기능
- 매일 수면시간 기록
- 월간 수면시간 평균 출력
- 수면시간 평균에 따른 상태변화

## 해야 할일 순서
- 백에게 알려줄 데이터 명세만들기

- [페이지] 할일 => 완료여부
- [HOME] 오늘 시간 입력/수정 구현 => 2023-02-08 완료
- [HOME] 오늘 시간 출력 구현 => 2023-02-08 완료
- 페이지 구현 => 2023-02-15 완료
- [수면시간 기록 전체보기] 출력 구현 => 2023-02-28 완료
- [수면시간 기록 전체보기] 입력/수정/삭제 구현 => 2023-04-06 완료 : react-datepicker 사용
- [로그인, 내 설정, 친구꿀쟘젤리] UI 디자인 => 2023-04-08 완료
- [로그인] UI구현 => 진행중
- [로그인] 로그인 기능 구현
- [로그인] 닉네임 추가 기능 구현
- [내 설정] UI 구현
- [내 설정] 로그아웃 기능 구현
- [내 설정] 닉네임 수정 기능 구현
- [친구꿀쟘젤리] 상태메세지 추가/수정 기능 구현
- [친구꿀쟘젤리] 친구 요청/수락 기능 구현
- [친구꿀쟘젤리] 친구 정보 출력 기능 구현
- [친구꿀쟘젤리] 친구 삭제 기능 구현
- 상태메세지를 모아볼 수 있는 페이지를 추가할까..?

나중에 정리할거
react-datepicker 사용
https://yarnpkg.com/package/date-fns

예제
https://reactdatepicker.com/
renderCustomHeader : 모달 달력의 년, 월 표시하는 부분을 커스텀 할 수 있다





### 나중에 해야 할일
- 시간 보여줄때 0분이면 분 표시 없애기 ex) 8시 0분 => 8시 ✅
- 오늘 시간 입력시 초기값 8시일것 ✅
- 버튼 호버시 스타일 추가 ✅
- '수면시간 기록 전체보기'페이지 열고있을때 그 페이지 밖 클릭 시 닫히기
- 오늘 시간 입력 터치로도 스크롤 가능하게 구현할것
- aria 속성 추가하기
- react 책 보면서 코드개선
- 꿀잠젤리 클릭시 모션 추가

## 
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
