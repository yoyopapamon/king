document.getElementById('analyze-btn').addEventListener('click', () => {
    const text = document.getElementById('resume-text').value;
    const keywordInput = document.getElementById('keywords').value;
    const resultSection = document.getElementById('result-section');
    const scoreNumber = document.getElementById('score-number');
    const resultMessage = document.getElementById('result-message');
    const foundKeywordsContainer = document.getElementById('found-keywords');

    if (!text || !keywordInput) {
        alert('이력서 내용과 키워드를 모두 입력해주세요!');
        return;
    }

    // 키워드 분리 및 공백 제거
    const keywords = keywordInput.split(',').map(k => k.trim()).filter(k => k !== '');
    
    let matchCount = 0;
    const foundKeywords = [];

    keywords.forEach(keyword => {
        // 대소문자 구분 없이 검색
        const regex = new RegExp(keyword, 'gi');
        if (text.match(regex)) {
            matchCount++;
            foundKeywords.push(keyword);
        }
    });

    // 점수 계산
    const score = Math.round((matchCount / keywords.length) * 100);

    // 결과 표시
    resultSection.classList.remove('hidden');
    scoreNumber.textContent = score;

    // 메시지 설정
    if (score >= 80) {
        resultMessage.textContent = "우수한 매칭률입니다! 이 지원자는 필수 역량을 대부분 갖추고 있습니다.";
        resultMessage.style.color = "#2E7D32";
    } else if (score >= 50) {
        resultMessage.textContent = "적절한 매칭률입니다. 추가적인 면접을 통해 역량을 확인해보세요.";
        resultMessage.style.color = "#1565C0";
    } else {
        resultMessage.textContent = "매칭률이 낮습니다. 필수 키워드가 부족한지 확인이 필요합니다.";
        resultMessage.style.color = "#C62828";
    }

    // 발견된 키워드 태그 생성
    foundKeywordsContainer.innerHTML = '';
    foundKeywords.forEach(k => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = k;
        foundKeywordsContainer.appendChild(tag);
    });

    // 결과 섹션으로 스크롤 이동
    resultSection.scrollIntoView({ behavior: 'smooth' });
});
