const T = {
  zh: {
    title: '下载中心', desc: '选择你要下载的文件，下载后自动计数',
    'img.name': '系统镜像', 'src.name': '源码包',
    'c.pre': '你是 CanopyOS 镜像第 ', 'c.post': ' 个下载者',
    back: '← 返回主页',
  },
  en: {
    title: 'Download Center', desc: 'Choose a file to download. Counter updates automatically.',
    'img.name': 'System Image', 'src.name': 'Source Code',
    'c.pre': 'You are CanopyOS downloader #', 'c.post': '',
    back: '← Back to Home',
  }
};

let lang = 'zh';

function applyLang(l) {
  lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (T[l][k]) el.textContent = T[l][k];
  });
}

function toggleLang() {
  applyLang(lang === 'zh' ? 'en' : 'zh');
}

function trackDownload(type) {
  if (type !== 'img') return;
  fetch('https://api.countapi.xyz/hit/canopyos/image-downloads')
    .then(r => r.json())
    .then(d => { if (d.value) document.getElementById('count-num').textContent = d.value; })
    .catch(() => {
      let c = parseInt(localStorage.getItem('canopyos_dl') || '0') + 1;
      localStorage.setItem('canopyos_dl', c);
      document.getElementById('count-num').textContent = c;
    });
}

(function init() {
  let c = localStorage.getItem('canopyos_dl');
  if (c) document.getElementById('count-num').textContent = c;
  fetch('https://api.countapi.xyz/get/canopyos/image-downloads')
    .then(r => r.json())
    .then(d => { if (d.value) document.getElementById('count-num').textContent = d.value; })
    .catch(() => {});
  const l = navigator.language || navigator.userLanguage;
  applyLang(l.startsWith('zh') ? 'zh' : 'en');
})();
