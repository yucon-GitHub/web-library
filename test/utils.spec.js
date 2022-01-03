import * as utils  from '../js/utils';

describe("utils methods test", () => {
  test('formatParams',() => {
    const result = {
      id: "1",
      name: '小明'
    };

    expect(utils.formatParams('?id=1&name=小明')).toEqual(result);
  });

  test('hexToRgba', () => {
    const result = 'rgba(255, 255, 255, 1)';

    expect(utils.hexToRgba('#ffffff', 1)).toEqual(result);
  });

  test('rgbToHex', () => {
    const result = '#000000';

    expect(utils.rgbToHex('rgb(0, 0, 0)')).toEqual(result);
  });

});
