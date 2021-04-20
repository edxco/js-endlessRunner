import 'regenerator-runtime';

export const getScore = async () => {
  const response = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/KLjniYO3szBR5LxSx5en/scores',
    {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const result = await response.json();
  const elements = await result;
  elements.result.sort((a, b) => (b.score - a.score));
  return elements;
};

export const setScore = async (user, score) => {
  const data = {
    user,
    score,
  };
  await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/KLjniYO3szBR5LxSx5en/scores',
    {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
};