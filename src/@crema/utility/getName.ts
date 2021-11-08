import { head, join, map, pipe, replace, split } from 'ramda';

export default function getInitialsFromName(str?: string): string | undefined {
  if (!str) {
    return undefined;
  }

  // const regex = /(?!\bm[rs]\.?\b|\bmiss\b|\bmrs\b)((?<=\s)|(?<=^))(\b[a-z])/gi;
  // const matches = str.match(regex);
  // let initials = '';
  // if (matches) {
  //   initials = [...matches][0].toUpperCase();
  //   if (matches.length > 1) {
  //     initials += matches[matches.length - 1].substring(0, 1).toUpperCase();
  //   }
  // }

  // drop the Mrs Miss Ms Mr
  const regex = /^(mr(s)?)|(m(is)?s)\.?\s+/gi;

  const initials = pipe<string, string, string[], string[], string>(
    replace(regex, ''),
    split(' '),
    map<string, string>(head),
    join(''),
  )(str);

  return `https://via.placeholder.com/150/858585/FFFFFF/?text=${initials}`;
}
