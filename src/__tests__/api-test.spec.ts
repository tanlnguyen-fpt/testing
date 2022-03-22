import apiClient from '../util/apiClient';

jest.setTimeout(10000);
describe('Test all routes', () => {
  it('should Pass getting details', async function () {
    const endpoint = `/`;
    let response;
    try {
      response = await apiClient.get(endpoint);
    } catch (e) {
      response = e;
    }

    console.log(response);

    expect(response.status).toBe(200);
    expect(response.data).toBe('Ok');
  });
});
