async function extractTextFromFile(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
  });
}

async function checkPlagiarism() {
  const file1 = document.getElementById('file1').files[0];
  const file2 = document.getElementById('file2').files[0];

  if (!file1 || !file2) {
      alert('Please select two files.');
      return;
  }

  const text1 = await extractTextFromFile(file1);
  const text2 = await extractTextFromFile(file2);

  const similarityPercentage = calculateSimilarityPercentage(text1, text2);

  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `Plagiarism detected: ${similarityPercentage.toFixed(2)}%`;
}

function calculateSimilarityPercentage(text1, text2) {
  const similarityScore = calculateSimilarityScore(text1, text2);
  return similarityScore * 100;
}

function calculateSimilarityScore(text1, text2) {
  const words1 = text1.split(/\s+/).filter(word => word.trim() !== '');
  const words2 = text2.split(/\s+/).filter(word => word.trim() !== '');
  const uniqueWords1 = new Set(words1);
  const uniqueWords2 = new Set(words2);
  const sharedWords = new Set([...uniqueWords1].filter(word => uniqueWords2.has(word)));
  return sharedWords.size / Math.max(uniqueWords1.size, uniqueWords2.size);
}
