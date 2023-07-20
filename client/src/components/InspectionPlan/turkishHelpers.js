export const toLowerTurkish = str => {
    let res = '';
    for(let i=0; i<str.length; i++) {
      let ch = str.charAt(i);
      switch (ch) {
        case 'I': res += 'ı'; break;
        case 'Ö': res += 'ö'; break;
        case 'Ü': res += 'ü'; break;
        case 'Ş': res += 'ş'; break;
        case 'Ğ': res += 'ğ'; break;
        case 'Ç': res += 'ç'; break;
        default:  res += ch.toLowerCase();
      }
    }
    return res;
  };
  
  export const toUpperTurkish = str => {
    let res = '';
    for(let i=0; i<str.length; i++) {
      let ch = str.charAt(i);
      switch (ch) {
        case 'ı': res += 'I'; break;
        case 'ö': res += 'Ö'; break;
        case 'ü': res += 'Ü'; break;
        case 'ş': res += 'Ş'; break;
        case 'ğ': res += 'Ğ'; break;
        case 'ç': res += 'Ç'; break;
        default:  res += ch.toUpperCase();
      }
    }
    return res;
  };
  