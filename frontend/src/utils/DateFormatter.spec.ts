import { expect } from 'chai';
import 'mocha';
import { formatDate } from './DateFormatter';

it('should format a date correctly', (done) => {
    let date: Date = new Date(1986, 5, 2, 1, 49, 22, 0)
    
    expect(formatDate(date)).to.equal('1986-06-02 01:49:22');
    done();
});