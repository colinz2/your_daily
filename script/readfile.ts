import path, { resolve } from 'path';
import { existsSync, lstatSync, readdirSync } from 'fs';

// 最近 3 个月展开
let gMonthsCollapsible = 3;

function isPathDirInDocs(path: string) : {returnPath: string, isDir : Boolean} {
  const dirPath = resolve(`./docs/${path}`);
  return {returnPath : dirPath, isDir: existsSync(dirPath) && lstatSync(dirPath).isDirectory()};
}

export function readFileList(year: string, moon : string) {
    const fileList = [];
    let {returnPath : dirPath, isDir: isDir} = isPathDirInDocs(`${year}/${moon}`);
    if (!isDir) {
      return fileList;
    }

    const files = readdirSync(dirPath);
    files.forEach((item) => {
      let dayNum = parseInt(item);
      if (dayNum > 0 && dayNum < 32) {
        fileList.push( {
            'text': `${year}年${moon}月${dayNum}日`,
            'link': `/${year}/${moon}/${item}`,
          }
        );
      }
    });
    return fileList.reverse();
}

// 获取年目录的所有类别，子项是月，月下面是天
export function getYearList(year : string) {
    let yearNum = parseInt(year);
    if (yearNum < 2000 || yearNum > 2100) {
      return [];
    }

    let {returnPath : dirPath, isDir: isDir} = isPathDirInDocs(`${year}`);
    if (!isDir){
      return [];
    }

    let fileList = [];
    let date = new Date();
    let M = (date.getFullYear() - yearNum) * 12 + date.getMonth() ;

    readdirSync(dirPath).forEach((item) => {
      let monthNum = parseInt(item);
      if (monthNum > 0 && monthNum < 13) {
        let {isDir: isDir} = isPathDirInDocs(`${year}/${item}`);
        isDir && fileList.push( {
            'collapsible': M - monthNum >= gMonthsCollapsible,
            'text': `${year}年${monthNum}月`,
            'children': readFileList(year, item),
          }
        );
      }
    });
    return fileList.reverse();
}