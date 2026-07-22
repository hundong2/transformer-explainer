# Transformer Explainer: 텍스트 생성 모델을 인터랙티브하게 배우기

[English](README.md) | [한국어](README_kor.md) | [한국어 학습 가이드](guide/README.md)

Transformer Explainer는 GPT 같은 Transformer 기반 모델이 어떻게 작동하는지 누구나 배울 수 있도록 만든 인터랙티브 시각화 도구입니다. 브라우저 안에서 실제 GPT-2 모델을 실행하므로, 사용자가 직접 텍스트를 입력하고 Transformer의 내부 구성 요소와 연산이 다음 token을 예측하기 위해 어떻게 함께 동작하는지 실시간으로 관찰할 수 있습니다.

라이브 데모는 http://poloclub.github.io/transformer-explainer 에서 사용할 수 있으며, YouTube 데모 영상은 https://youtu.be/TFUc41G2ikY 에서 볼 수 있습니다.<br/><br/>

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![arxiv badge](https://img.shields.io/badge/arXiv-2408.04619-red)](https://arxiv.org/abs/2408.04619)

<a href="https://youtu.be/TFUc41G2ikY" target="_blank"><img width="100%" src='https://github.com/user-attachments/assets/0a4d8888-6555-4df5-bc71-77f1299115c3'></a>

## Live Demo

Transformer Explainer 실행하기: http://poloclub.github.io/transformer-explainer

## Research Paper

[**Transformer Explainer: Learning LLM Transformers with Interactive Visual Explanation and Experimentations**](https://dl.acm.org/doi/pdf/10.1145/3772318.3791725).
Aeree Cho, Grace C. Kim, Alexander Karpekov, Seongmin Lee, Alec Helbling, Benjamin Hoover, Zijie J. Wang, Minsuk Kahng, Duen Horng Chau.
_Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems._

## How to run locally

### Prerequisites

- Node.js v20 이상
- NPM v10 이상

### Steps

```bash
git clone https://github.com/poloclub/transformer-explainer.git
cd transformer-explainer
npm install
npm run dev
```

그다음 웹 브라우저에서 http://localhost:5173 에 접속합니다.

## Korean Learning Guide

한국어로 설치, 구조, Transformer 핵심 개념, 디버깅, 확장 실습을 순서대로 학습하려면 [guide/README.md](guide/README.md)를 참고하세요.

## Credits

Transformer Explainer는 Georgia Institute of Technology의 <a href="https://aereeeee.github.io/" target="_blank">Aeree Cho</a>, <a href="https://www.linkedin.com/in/chaeyeonggracekim/" target="_blank">Grace C. Kim</a>, <a href="https://alexkarpekov.com/" target="_blank">Alexander Karpekov</a>, <a href="https://alechelbling.com/" target="_blank">Alec Helbling</a>, <a href="https://zijie.wang/" target="_blank">Jay Wang</a>, <a href="https://seongmin.xyz/" target="_blank">Seongmin Lee</a>, <a href="https://bhoov.com/" target="_blank">Benjamin Hoover</a>, <a href="https://poloclub.github.io/polochau/" target="_blank">Polo Chau</a>가 만들었습니다.

## Citation

```bibTeX
@inproceedings{cho2026transformer,
  title={Transformer Explainer: Learning LLM Transformers with Interactive Visual Explanation and Experimentation},
  author={Cho, Aeree and Kim, Grace C and Karpekov, Alexander and Lee, Seongmin and Helbling, Alec and Hoover, Benjamin and Wang, Zijie J and Kahng, Minsuk and Chau, Duen Horng},
  booktitle={Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems},
  pages={1--21},
  year={2026}
}
```

## License

소프트웨어는 [MIT License](https://github.com/poloclub/transformer-explainer/blob/main/LICENSE)로 제공됩니다.

## Contact

질문이 있으면 [issue를 열거나](https://github.com/poloclub/transformer-explainer/issues/new/choose), [Aeree Cho](https://aereeeee.github.io/) 또는 위에 나열된 기여자에게 연락할 수 있습니다.

## More AI explainers to check out

- [**Diffusion Explainer**](https://poloclub.github.io/diffusion-explainer): Stable Diffusion이 text prompt를 이미지로 변환하는 과정을 학습합니다.
- [**CNN Explainer**](https://poloclub.github.io/cnn-explainer)
- [**GAN Lab**](https://poloclub.github.io/ganlab): 브라우저에서 Generative Adversarial Networks를 직접 실험합니다.
