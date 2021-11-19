import * as utils  from '../js/utils';

describe("utils methods test", () => {
  test('formatParams', async () => {
    const result = {
      id: "1",
      name: '小明'
    };

    expect(utils.formatParams('?id=1&name=小明')).toEqual(result);
  });
});