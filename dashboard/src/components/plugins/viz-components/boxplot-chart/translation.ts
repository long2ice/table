import { TranslationPatch } from '~/types/plugin';

const en = {
  boxplot: {
    box: 'Box',
    outlier: 'Outlier',
    scatter: 'Scatter',
  },
};

const zh = {
  boxplot: {
    box: '箱体',
    outlier: '异常点',
    scatter: '散点',
  },
};

export const translation: TranslationPatch = [
  {
    lang: 'en',
    resources: en,
  },
  {
    lang: 'zh',
    resources: zh,
  },
];
