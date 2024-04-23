const calculateScore = (score: number): string => {
    const zerosArr = ['0', '0', '0', '0', '0', '0'];
    const appScoreString: string = score.toString();

    const scoreToDisplayArr: string[] = zerosArr.slice(0, zerosArr.length - appScoreString.length);

    const scoreString: string = scoreToDisplayArr.join('') + appScoreString;

    return scoreString;
}

export default calculateScore;