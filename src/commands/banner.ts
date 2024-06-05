import command from '../../config.json' assert {type: 'json'};

const createBanner = (): string[] => {
  const banner: string[] = [];
  banner.push('<br>');
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    command.asciiMobile.forEach((ele) => {
      let bannerString = '';
      for (let i = 0; i < ele.length; i++) {
        if (ele[i] === ' ') {
          bannerString += ' ';
        } else {
          bannerString += ele[i];
        }
      }
      let eleToPush = `<pre>${bannerString}</pre>`;
      banner.push(eleToPush);
    });
  } else {
    command.ascii.forEach((ele) => {
      let bannerString = '';
      for (let i = 0; i < ele.length; i++) {
        if (ele[i] === ' ') {
          bannerString += ' ';
        } else {
          bannerString += ele[i];
        }
      }
      let eleToPush = `<pre>${bannerString}</pre>`;
      banner.push(eleToPush);
    });
  }
  banner.push('<br>');
  banner.push('Welcome to my terminal! v1.0.1');
  banner.push("Type <span class='command'>'help'</span> for a list of all available commands.");
  banner.push('<br>');
  return banner;
};

export const BANNER = createBanner();
