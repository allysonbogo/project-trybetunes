const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`, { method: 'POST', headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: getMusics });
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
