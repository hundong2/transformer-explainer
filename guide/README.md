# Transformer Explainer 한국어 학습 가이드

작성일: 2026-07-23

## 출처와 작업 범위

- 저장소: https://github.com/hundong2/transformer-explainer
- 원본 upstream: https://github.com/poloclub/transformer-explainer
- 확인 기준일: 2026-07-23
- 기준 커밋: `bfe50afba10b9b560b84143ee1107d977defa74f`
- 작업 범위: 원본 README, package 설정, `src/` 구조를 바탕으로 한국어 설치/학습/실습 가이드를 제공한다.

이 가이드는 원본 프로젝트 코드를 바꾸지 않고 학습자가 저장소를 이해하고 안전하게 실행·확장할 수 있도록 돕는 문서다.

## 프로젝트의 목적과 해결하는 문제

Transformer Explainer는 GPT류 텍스트 생성 모델의 내부 흐름을 브라우저에서 직접 관찰하게 해 주는 교육용 시각화 도구다. 사용자가 prompt를 입력하면 브라우저 안에서 GPT-2 ONNX 모델이 실행되고, embedding, attention, MLP, residual path, softmax, sampling 같은 단계가 시각적으로 연결된다.

이 프로젝트가 해결하는 문제는 "Transformer 설명은 많지만 실제 token이 어떻게 흘러가는지 손으로 만져 보기 어렵다"는 점이다. 정적인 그림 대신 입력을 바꾸고 결과를 보면서 내부 계산을 따라갈 수 있다.

## 필수 개념과 주요 용어

| 용어                 | 의미                                                                               |
| -------------------- | ---------------------------------------------------------------------------------- |
| Token                | 모델이 처리하는 텍스트 단위. 단어, 부분 단어, 기호일 수 있다.                      |
| Embedding            | token ID를 연속 벡터로 바꾼 표현이다.                                              |
| Positional encoding  | token 순서 정보를 벡터에 더하는 방식이다.                                          |
| Attention            | 각 token이 다른 token을 얼마나 참고할지 계산하는 메커니즘이다.                     |
| Q/K/V                | Query, Key, Value. attention score와 정보 혼합을 위한 세 벡터다.                   |
| Multi-head attention | 여러 attention head가 서로 다른 관계를 병렬로 본다.                                |
| MLP                  | attention 뒤에서 각 token representation을 비선형 변환하는 feed-forward block이다. |
| Residual connection  | 입력을 다음 단계 출력에 더해 정보 손실과 학습 불안정을 줄이는 연결이다.            |
| Layer normalization  | activation 분포를 안정화하는 정규화 연산이다.                                      |
| Logits               | vocabulary의 다음 token 후보별 점수다.                                             |
| Softmax              | logits를 확률 분포로 바꾼다.                                                       |
| Temperature          | sampling 확률 분포의 날카로움을 조절한다.                                          |
| ONNX                 | 브라우저나 여러 runtime에서 모델을 실행하기 위한 교환 형식이다.                    |

## 설치, 환경 설정과 최소 실행

필수 버전은 원본 README와 `package.json` 기준이다.

- Node.js v20 이상
- NPM v10 이상

```bash
git clone https://github.com/hundong2/transformer-explainer.git
cd transformer-explainer
npm install
npm run dev
```

브라우저에서 http://localhost:5173 에 접속한다.

빌드 검증은 다음 명령을 사용한다.

```bash
npm run check
npm run lint
npm run build
```

## 핵심 기능과 일반적인 사용 흐름

1. 브라우저에서 앱을 연다.
2. 입력창에 짧은 prompt를 입력한다.
3. 모델이 다음 token 후보를 계산하는 동안 시각화가 갱신된다.
4. embedding, attention, MLP, softmax, sampling 영역을 차례로 확인한다.
5. temperature 같은 제어값을 바꾸며 output distribution 변화를 관찰한다.
6. attention head나 weight popover를 열어 token 간 관계를 살펴본다.

초보자는 "입력 token이 embedding으로 바뀌고, attention/MLP를 지나 logits와 확률이 된다"는 큰 흐름을 먼저 본다. 이후 Q/K/V, residual, layer norm, sampling 같은 세부 연산으로 들어가면 된다.

## 저장소 구조와 주요 모듈

```text
transformer-explainer/
  src/
    routes/                  # SvelteKit 페이지 진입점
    components/              # Transformer 시각화 UI 컴포넌트
    components/common/       # 행렬, 벡터, 슬라이더 등 공통 UI
    components/Popovers/     # weight와 연산 설명 popover
    constants/examples/      # 데모 prompt 예제
    store/                   # 앱 상태 관리
    utils/                   # 데이터, animation, model chunk loading 도우미
    utils/model/             # GPT-2 모델 export/chunk/quantize 관련 Python 도구
  static/
    model-v2/                # 브라우저에서 불러오는 ONNX model chunk
    article_assets/          # 설명 이미지
    preview/                 # README/공유용 preview 이미지
  guide/
    examples/                # 한국어 학습용 격리 예제
```

주요 컴포넌트는 이름 그대로 Transformer 흐름을 반영한다.

- `Embedding.svelte`: token embedding 단계
- `QKV.svelte`: query, key, value 변환
- `Attention.svelte`, `AttentionMatrix.svelte`, `HeadStack.svelte`: attention score와 head 시각화
- `Mlp.svelte`: feed-forward network 단계
- `LinearSoftmax.svelte`, `ProbabilityBars.svelte`: logits, softmax, token 확률 표시
- `Sampling.svelte`, `Temperature.svelte`: sampling과 temperature 상호작용

## 기본 예제에서 응용 예제로 이어지는 실습

### 실습 1: 로컬 앱 실행

```bash
npm install
npm run dev
```

확인할 것:

- 첫 로딩에서 model chunk가 정상적으로 내려오는지 확인한다.
- 브라우저 개발자 도구 Network 탭에서 `static/model-v2/` chunk 요청을 확인한다.
- 입력 prompt를 짧게 바꿨을 때 visualization이 갱신되는지 본다.

### 실습 2: 예제 prompt 읽기

`src/constants/examples/` 아래 파일을 열어 기본 prompt 예제를 확인한다. 예제를 바꾸면 사용자가 처음 만나는 학습 경로도 달라진다.

### 실습 3: attention softmax 계산 직접 실행

아래 예제는 앱 내부 코드와 분리된 학습용 Node.js 스크립트다.

```bash
node guide/examples/attention-softmax-demo.js
```

이 예제는 query/key dot product, scaling, softmax, weighted sum을 작은 숫자로 계산한다. 실제 UI는 더 복잡하지만 attention의 기본 계산은 같은 구조를 따른다.

### 실습 4: 새 설명 popover 추가 설계

새 popover를 만들 때는 다음 순서를 따른다.

1. `src/components/Popovers/`의 기존 파일을 하나 선택해 props와 스타일 패턴을 읽는다.
2. 설명 문구는 짧고 시각화 주변 맥락에 맞춘다.
3. 행렬 또는 벡터를 보여줄 때는 `src/components/common/`의 공통 컴포넌트를 재사용한다.
4. `npm run check`로 Svelte 타입 오류를 확인한다.

## 테스트, 디버깅과 자주 발생하는 문제

### Node 버전 오류

`package.json`은 Node.js `>=20.0.0`, npm `>=10.0.0`을 요구한다. 낮은 버전에서는 Vite, SvelteKit, dependency resolution 문제가 날 수 있다.

### 모델 chunk 로딩 실패

`static/model-v2/` 파일이 누락되면 브라우저에서 GPT-2 ONNX 모델을 실행할 수 없다. submodule clone 후 파일이 있는지 확인한다.

```bash
dir static\model-v2
```

### Svelte 타입 오류

```bash
npm run check
```

컴포넌트 props, store 타입, route 타입 오류를 먼저 본다.

### Formatting 또는 lint 실패

```bash
npm run lint
npm run format
```

기여 전에는 format을 적용하고 다시 lint를 실행한다.

### 빌드 후 정적 배포 확인

```bash
npm run build
npm run preview
```

정적 배포에서는 base path와 asset path가 중요하다. GitHub Pages 배포를 바꿀 때는 `svelte.config.js`, `vite.config.ts`, `package.json`의 deploy script를 함께 확인한다.

## 성능, 보안, 배포와 확장

### 성능

브라우저에서 ONNX 모델을 직접 실행하므로 초기 다운로드와 추론 비용이 사용자 기기에 걸린다. 모델 chunk 캐싱, lazy loading, animation throttling이 체감 성능에 중요하다.

### 보안과 개인정보

모델이 브라우저에서 실행되므로 prompt가 서버로 전송되지 않는 장점이 있다. 다만 analytics, 외부 asset, 배포 환경 설정을 추가할 때는 입력 텍스트가 외부로 나가지 않는지 검토해야 한다.

### 배포

원본은 GitHub Pages 배포 스크립트를 포함한다.

```bash
npm run build
npm run deploy
```

fork에서 배포하려면 repository URL, GitHub Pages 설정, base path를 확인해야 한다.

### 확장 아이디어

- 한국어 prompt 예제 추가
- attention head별 설명 popover 보강
- temperature와 top-k/top-p sampling 비교 모듈 추가
- 작은 Transformer block을 손계산하는 tutorial route 추가
- 모바일 화면에서 matrix visualization을 더 읽기 쉽게 조정

## 기여 방법

1. issue나 TODO를 확인한다.
2. 작은 UI 변경은 관련 Svelte 컴포넌트만 고친다.
3. 학습 설명 변경은 README, guide, popover 문구를 함께 맞춘다.
4. 변경 후 `npm run check`, `npm run lint`, `npm run build`를 실행한다.
5. 시각화 변경은 브라우저에서 직접 상호작용을 확인한다.

## 다음 학습 경로

1. 원본 논문과 README를 읽고 전체 목적을 이해한다.
2. 앱을 실행해 prompt를 바꾸며 token 흐름을 관찰한다.
3. `guide/examples/attention-softmax-demo.js`로 attention 계산을 손으로 확인한다.
4. `src/components/Attention.svelte`와 `AttentionMatrix.svelte`를 읽는다.
5. `src/store/index.ts`에서 앱 상태가 어떻게 연결되는지 확인한다.
6. `src/utils/fetchChunks.js`와 `static/model-v2/`를 보며 브라우저 모델 로딩 방식을 학습한다.
7. 작은 popover나 예제 prompt를 추가하면서 기여 흐름을 연습한다.
