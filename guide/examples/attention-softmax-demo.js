/**
 * Transformer Explainer 학습용 attention 계산 예제
 *
 * 목표:
 * - query와 key의 dot product로 attention score를 만든다.
 * - score를 sqrt(d_k)로 나누어 scale한다.
 * - softmax로 attention weight를 만든다.
 * - weight로 value vector를 가중합한다.
 *
 * 실행:
 *   node guide/examples/attention-softmax-demo.js
 *
 * 예상 결과:
 * - 각 token이 다른 token을 얼마나 참고하는지 attention weight가 출력된다.
 * - 마지막 줄에 attention output vector가 출력된다.
 */

const tokens = ['The', 'cat', 'sat'];

const query = [0.8, 0.2, 0.1];
const keys = [
	[0.7, 0.1, 0.0],
	[0.2, 0.9, 0.1],
	[0.1, 0.2, 0.8]
];
const values = [
	[1.0, 0.0],
	[0.0, 1.0],
	[0.5, 0.5]
];

function dot(a, b) {
	return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

function softmax(scores) {
	const maxScore = Math.max(...scores);
	const expScores = scores.map((score) => Math.exp(score - maxScore));
	const total = expScores.reduce((sum, value) => sum + value, 0);
	return expScores.map((value) => value / total);
}

function weightedSum(weights, vectors) {
	const output = new Array(vectors[0].length).fill(0);
	for (let row = 0; row < vectors.length; row += 1) {
		for (let col = 0; col < output.length; col += 1) {
			output[col] += weights[row] * vectors[row][col];
		}
	}
	return output;
}

const keyDimension = query.length;
const rawScores = keys.map((key) => dot(query, key));
const scaledScores = rawScores.map((score) => score / Math.sqrt(keyDimension));
const attentionWeights = softmax(scaledScores);
const outputVector = weightedSum(attentionWeights, values);

console.log('Tokens:', tokens.join(', '));
console.log('Raw scores:', rawScores.map((value) => value.toFixed(3)).join(', '));
console.log('Scaled scores:', scaledScores.map((value) => value.toFixed(3)).join(', '));
console.log('Attention weights:');
tokens.forEach((token, index) => {
	console.log(`  ${token}: ${attentionWeights[index].toFixed(3)}`);
});
console.log('Attention output:', outputVector.map((value) => value.toFixed(3)).join(', '));
