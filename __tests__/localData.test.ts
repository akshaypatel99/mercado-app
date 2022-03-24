import { localDate } from "../lib/localDate";

describe('localDate function', () => { 
  it('converts date to numeric date only', () => { 
    expect(localDate(new Date(2022, 2, 12))).toBe('12/03/2022');
    expect(localDate(new Date('2022-03-15T07:15:07.925+00:00'))).toBe('15/03/2022');
  });
});