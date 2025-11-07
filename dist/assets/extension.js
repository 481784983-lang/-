/**
 * SillyTavern 扩展：多角色聊天文本分割与头像渲染
 * 支持批量格式化场景剧本、群聊日志等为独立角色块展示，自动加头像、美化格式。
 * 作者: 481784983-lang
 * 安装：放入 SillyTavern extensions 目录，或从 Github 安装本脚本
 */

// ------ 角色头像映射表 ------
const avatarMap = {
  "董妵": "https://i.postimg.cc/YC8GLSM9/1762118116092.png",
  "貂蝉": "https://i.postimg.cc/YC8GLSM0/1762118371125.png",
  "夏侯惇": "https://i.postimg.cc/3wRyXHx7/1762119173735.png",
  "孙策": "https://i.postimg.cc/LsXqtM8J/1762119880166.png",
  "周瑜": "https://i.postimg.cc/9fM4djQw/1762119922194.png",
  "孙姈": "https://i.postimg.cc/1ztgGZ3D/1762120081011.png",
  "陆焰": "https://i.postimg.cc/SKsX6pxr/1762120196379.png",
  "袁绍": "https://i.postimg.cc/QMyFSnFk/1762120290777.png",
  "曹婥": "https://i.postimg.cc/rwg0RpMq/IMG-20251103-051232.png",
  "吕凤仙": "https://i.postimg.cc/FKBYGnYG/IMG-20251103-055725.png",
  "张娇": "https://i.postimg.cc/FKBYGnYC/IMG-20251103-055745.png",
  "刘蓓": "https://i.postimg.cc/yNbDnrDb/IMG-20251103-055801.png",
  "关云": "https://i.postimg.cc/W4HdSfDV/IMG-20251103-055815.png",
  "张绯": "https://i.postimg.cc/W4HdSfDj/IMG-20251103-055827.png",
  "赵云": "https://i.postimg.cc/SsYJP793/IMG-20251103-055845.png",
  "诸葛亮": "https://i.postimg.cc/RFJNYQfx/IMG-20251103-055911.png",
  "许褚": "https://i.postimg.cc/FRk76gcN/IMG-20251103-055937.png",
  "郭嘉": "https://i.postimg.cc/j5nL1QNs/IMG-20251103-055948.png",
  "荀彧": "https://i.postimg.cc/d1ZLfmds/IMG-20251103-060004.png",
  "于吉": "https://i.postimg.cc/x8rcVJyT/IMG-20251103-060043.png",
  "南华": "https://i.postimg.cc/qqfzHhX7/IMG-20251103-060052.png",
  "左慈": "https://i.postimg.cc/d3MLckm1/IMG-20251103-060103.png",
  "默认": "https://i.postimg.cc/52BdWZVT/default.png"
};

// ------ UI状态栏：初始骨架数据 ------
const initialStatusBarState = JSON.parse(String.raw`{
  "世界" : {
    "时间" : [
      "",
      "当前的游戏内日期。随剧情推进更新，格式为：XXN年 (公元 YYYY年)。请AI根据剧情（如战斗、旅行）合理推进时间。" 
    ],
    "地点" : [
      "",
      "主角<user>当前所在的具体地点。e.g., 洛阳->虎牢关" 
    ]
  },
  "主角" : {
    "势力" : [
      "群雄" ,
      "【UI主题核心】主角<user>当前所属势力。UI将根据此值自动切换主题 ('群雄', '炎汉', '魏', '吴')。"
    ],
    "声望" : [
      "无名之辈" ,
      "主角<user>在天下的声望等级。随重大事件更新。e.g., 无名之辈 -> 崭露TP角 -> 威震一方 -> 天下闻名 -> 人道魁首"
    ],
    "命" : [
      1000,
      "【最大生命值】。AI应根据'武力'、'血脉'等进行设定。" 
    ],
    "法" : [
      1000,
      "【最大法力值】。AI应根据'谋略'、'血脉'等进行设定。" 
    ],
    "武力" : [
      0,
      "[1-100]，主角<user>的武力值。随锻炼、奇遇或血脉觉醒更新。" 
    ],
    "谋略" : [
      0,
      "[1-100]，主角<user>的谋略值。随学习或经历更新。" 
    ],
    "魅力" : [
      0,
      "[1-100]，主角<user>的魅力值。随事迹或血脉觉醒更新。" 
    ],
    "官职" : [
      "无" ,
      "主角的官职，由汉室(曹婥)册封，影响声望和权限。" 
    ],
    "血脉" : [
      "凡人" ,
      "主角觉醒的血脉。e.g., 凡人, 亚龙血脉, 魔裔。"
    ],
    "仙术" : [
      {
        "$meta" : {
          "extensible" : true ,
          "template" : {
            "名称" : ["新仙术" , "【类型】" ],
            "类型" : ["未知" , "e.g., 奇门, 符咒, 召唤"],
            "消耗" : ["法力 0" , "发动消耗" ],
            "描述" : ["暂无描述。" , ""]
          }
        }
      },
      "主角学会的仙术/奇门。" 
    ]
  },
  "行囊" : {
    "装备" : {
      "武器" : ["无" , "当前装备的武器。" ],
      "防具" : ["无" , "当前装备的防具。" ],
      "饰品" : ["无" , "当前装备的饰品。" ]
    },
    "背包" : [
      {
        "$meta" : {
          "extensible" : true ,
          "template" : {
            "名称" : ["新物品" , "【消耗品】" ],
            "数量" : [1, "描述：..." ],
            "描述" : ["暂无描述。" , ""]
          }
        }
      },
      "存放消耗品、材料、任务道具。" 
    ]
  },
  "关系表" : [
    { "$meta" : { "extensible" : true  } },
    "一个对象，用于【快速查阅】<user>已建立的【特殊羁绊】。键是人名(snake_case)，值是关系。AI应在'结缘录.xxx.当前关系'更新为'至交'、'妻子'、'宿敌'等特殊关系时，【同步】更新此表。" 
  ],
  "结缘录" : [
    {
      "$meta" : {
        "extensible" : true ,
        "required" : [
          "姓名" ,
          "年龄" ,
          "命" ,
          "法" ,
          "好感度" ,
          "仙术" ,
          "背包" 
        ],
        "template" : {
          "姓名" : ["？？？", "字？？？" ],
          "年龄" : [0, "？？？"],
          "官职" : ["无" , "？？？"],
          "武力" : [0, "[1-100+]"],
          "谋略" : [0, "[1-100+]"],
          "魅力" : [0, "[1-100+]"],
          "命" : [100, "【最大生命值】" ],
          "法" : [100, "【最大法力值】" ],
          "坐骑" : ["无" , "？？？"],
          "衣着" : ["暂无描述。" , "当前装束" ],
          "外貌" : ["暂无描述。" , "外貌特征" ],
          "武器" : ["【凡品】无" , "？？？"],
          "好感度" : [0, "[-1000 - +1000] (陌生)"],
          "当前关系" : ["陌生" , "？？？"],
          "仙术" : [
            {
              "$meta" : {
                "extensible" : true ,
                "template" : {
                  "名称" : ["新仙术" , "【血脉】" ],
                  "消耗" : ["法力 0" , ""],
                  "描述" : ["暂无描述。" , ""]
                }
              }
            },
            "‘将姫’的血脉能力与武技。" 
          ],
          "背包" : [
            {
              "$meta" : {
                "extensible" : true ,
                "template" : {
                  "名称" : ["新物品" , "【消耗品】" ],
                  "数量" : [1, "描述：..." ],
                  "描述" : ["暂无描述。" , ""]
                }
              }
            },
            "‘将姫’的随身行囊。" 
          ]
        }
      }
    },
    "此表记录所有重要NPC的【详细数据】。当<user>遇到新'将姫'时，AI应按此格式添加新条目。" 
  ],
  "天下闻" : {
    "奇闻" : [
      "（暂无奇闻）" ,
      "【V4.0规则】战略总览 (已确认的情报)。用 \\n 换行，记录【将姫】的军队动向和【神魔】的踪迹。e.g., \\n【将姫】曹婥(女)已于陈留起兵。\\n【神魔】'魔王'董妵(女)已抵达洛阳。"
    ],
    "当前剧情" : [
      "（等待开局...）" ,
      "【V4.0规则】<user>的实时冒险日志。总结<user>刚做了什么，和下一步的目标。"
    ]
  },
  "宿命诗" : [
    "（暂无诗篇）" ,
    "AI在剧情关键节点创作的七言律诗，总结宿命与史诗。"
  ]
}`);

const COLLAPSIBLE_SECTIONS = new Set(['主角', '行囊', '结缘录', '天下闻']);
const COLLAPSE_ANIMATION_MS = 260;

const SECTION_EPITHETS = {
  世界: '乾坤之象，风云与共',
  主角: '天命所钟，英姿无双',
  行囊: '囊萃百宝，随征万里',
  关系表: '金兰谱牒，肝胆相照',
  结缘录: '红尘邂逅，丹青留痕',
  天下闻: '四海风声，鼓角惊雷',
  宿命诗: '金石同韵，悲欢共吟'
};

const SECTION_ICON_MAP = {
  世界: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18"/></svg>`,
  主角: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="3.5"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>`,
  行囊: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9h14l-.7 9.4a2 2 0 0 1-2 1.6H7.7a2 2 0 0 1-2-1.6L5 9Z"/><path d="M9 9V6.5A2.5 2.5 0 0 1 11.5 4h1a2.5 2.5 0 0 1 2.5 2.5V9"/></svg>`,
  关系表: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="7" r="2.5"/><circle cx="19" cy="17" r="2.5"/><path d="M7.3 11.3 16.6 7.9M7.3 12.7l9.3 3.4"/></svg>`,
  结缘录: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h9a3 3 0 0 1 3 3v13l-4.5-2L9 20l-.2-.1A3 3 0 0 1 6 17V4Z"/><path d="M9 8h6"/></svg>`,
  天下闻: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4a2 2 0 0 0 2 2h2l4 4V4l-4 4H6a2 2 0 0 0-2 2Z"/><path d="M19 8v8"/></svg>`,
  default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/></svg>`
};

const SUBGROUP_ICON_MAP = {
  装备: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M6 7l6-4 6 4M6 17l6 4 6-4"/></svg>`,
  背包: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 8h11l1 11a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2l1-11Z"/><path d="M9 8V6a3 3 0 0 1 3-3 3 3 0 0 1 3 3v2"/></svg>`,
  default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="6" width="14" height="12" rx="2"/></svg>`
};

const ITEM_ICON_MAP = {
  时间: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2"/></svg>`,
  地点: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  势力: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M4 8h16M4 16h10"/></svg>`,
  声望: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M5 12h14v7H5z"/></svg>`,
  命: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21C12 21 5 15 5 9a7 7 0 0 1 14 0c0 6-7 12-7 12Z"/></svg>`,
  法: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>`,
  武力: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12h8"/><path d="m6 7 6-4 6 4"/><path d="m6 17 6 4 6-4"/></svg>`,
  谋略: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 1 8.95-10.2"/><path d="M12 7v5l3 3"/></svg>`,
  魅力: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-4-3-7-6.5-7-10A7 7 0 0 1 12 4a7 7 0 0 1 7 7c0 3.5-3 7-7 10Z"/></svg>`,
  官职: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="7" width="12" height="10" rx="2"/><path d="M9 7V5h6v2"/></svg>`,
  血脉: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16"/><path d="M7 8c1.5 1.5 3 2 5 2s3.5-.5 5-2"/><path d="M7 16c1.5-1.5 3-2 5-2s3.5.5 5 2"/></svg>`,
  仙术: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.4 4.9L20 9l-4 3.9.9 5.6L12 16l-4.9 2.5.9-5.6L4 9l5.6-.1Z"/></svg>`,
  装备: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14v10H5z"/><path d="M9 7V5h6v2"/></svg>`,
  背包: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10l1 11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2l1-11Z"/></svg>`,
  奇闻: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 7-5 7 5v8l-7 5-7-5V8Z"/><path d="M9 10h6"/></svg>`,
  当前剧情: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v14H4z"/><path d="M8 5v14"/><path d="m12 14 2.5 2 3.5-4"/></svg>`,
  关系表: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>`,
  default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/></svg>`
};

const COLLAPSE_INDICATOR_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m7 10 5 5 5-5"/></svg>`;

function createIconSpan(type, key) {
  const map = type === 'section' ? SECTION_ICON_MAP : type === 'subgroup' ? SUBGROUP_ICON_MAP : ITEM_ICON_MAP;
  const svg = map[key] || map.default;
  if (!svg) {
    return null;
  }
  const span = document.createElement('span');
  span.className = `st-ext-icon st-ext-icon-${type}`;
  span.setAttribute('aria-hidden', 'true');
  span.setAttribute('role', 'presentation');
  span.innerHTML = svg;
  return span;
}

function createSectionShell(title, options = {}) {
  const section = document.createElement('section');
  section.className = 'st-ext-status-section';

  const header = document.createElement('h3');
  header.className = 'st-ext-status-heading';

  const headerIcon = createIconSpan('section', title);
  if (headerIcon) {
    header.appendChild(headerIcon);
  }

  const headerText = document.createElement('span');
  headerText.className = 'st-ext-heading-text';
  headerText.textContent = title;
  header.appendChild(headerText);

  const headerEpithet = createSectionEpithet(title);
  if (headerEpithet) {
    header.appendChild(headerEpithet);
  }

  const content = document.createElement('div');
  content.className = 'st-ext-section-content';

  section.append(header, content);

  let collapseControls = null;
  if (options.collapsible) {
    section.classList.add('st-ext-collapsible');
    collapseControls = setupCollapsible(section, header, content, options);
  }

  return { section, header, content, collapseControls };
}

function setupCollapsible(section, header, content, options = {}) {
  const { collapsed = false, duration = COLLAPSE_ANIMATION_MS } = options;

  header.classList.add('st-ext-collapsible-trigger');
  header.setAttribute('role', 'button');
  header.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  header.tabIndex = 0;

  content.style.transition = `max-height ${duration}ms ease, opacity ${duration}ms ease`;

  const indicator = document.createElement('span');
  indicator.className = 'st-ext-collapse-indicator';
  indicator.innerHTML = COLLAPSE_INDICATOR_SVG;
  header.appendChild(indicator);

  const setCollapsed = (state) => {
    if (state) {
      section.classList.add('is-collapsed');
      header.setAttribute('aria-expanded', 'false');
      requestAnimationFrame(() => {
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
      });
    } else {
      section.classList.remove('is-collapsed');
      header.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(() => {
        content.style.maxHeight = `${content.scrollHeight}px`;
        content.style.opacity = '1';
      });
    }
  };

  const toggle = () => {
    const isCollapsed = section.classList.contains('is-collapsed');
    setCollapsed(!isCollapsed);
  };

  header.addEventListener('click', toggle);
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  });

  const refresh = () => {
    if (!section.classList.contains('is-collapsed')) {
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  };

  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(() => {
      refresh();
    });
    observer.observe(content);
  }

  requestAnimationFrame(() => {
    setCollapsed(collapsed);
  });

  return { setCollapsed, refresh };
}

function appendIconAndText(target, icon, text) {
  if (icon) {
    target.appendChild(icon);
  }
  const span = document.createElement('span');
  span.textContent = text;
  target.appendChild(span);
}

function createSectionEpithet(title, options = {}) {
  const text = SECTION_EPITHETS[title];
  if (!text) {
    return null;
  }

  const { tagName = 'span', className = 'st-ext-heading-epithet' } = options;
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createStatusBarContainer() {
  const container = document.createElement('div');
  container.id = 'st-ext-status-bar';
  container.className = 'st-ext-status-bar';
  container.innerHTML = `
    <header class="st-ext-status-header">
      <span class="st-ext-status-title st-ext-display-title">无双志</span>
      <span class="st-ext-status-sub">群英谱牒·风云长歌</span>
    </header>
    <div class="st-ext-status-body"></div>
  `;
  return container;
}

function extractEntryValue(entry) {
  if (Array.isArray(entry)) {
    const [value] = entry;
    if (value && typeof value === 'object' && value.$meta) {
      return '（待录入）';
    }
    return value ?? '';
  }
  if (entry && typeof entry === 'object' && entry.$meta) {
    return '（待录入）';
  }
  return entry ?? '';
}

function renderPrimitiveSection(title, entries) {
  const { section, content, collapseControls } = createSectionShell(title, {
    collapsible: COLLAPSIBLE_SECTIONS.has(title)
  });

  let currentList = null;

  const ensureList = () => {
    if (!currentList) {
      currentList = document.createElement('dl');
      currentList.className = 'st-ext-status-list';
    }
  };

  const flushList = () => {
    if (currentList && currentList.children.length) {
      content.appendChild(currentList);
    }
    currentList = null;
  };

  Object.entries(entries).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value) && !value.$meta) {
      flushList();
      const subDetails = document.createElement('div');
      subDetails.className = 'st-ext-status-subgroup';
      const subHeader = document.createElement('h4');
      subHeader.className = 'st-ext-status-subheading';
      const icon = createIconSpan('subgroup', key);
      if (icon) {
        subHeader.appendChild(icon);
      }
      const label = document.createElement('span');
      label.className = 'st-ext-heading-text';
      label.textContent = key;
      subHeader.appendChild(label);
      subDetails.appendChild(subHeader);

      let subList = null;

      Object.entries(value).forEach(([subKey, subValue]) => {
        if (!subList) {
          subList = document.createElement('dl');
          subList.className = 'st-ext-status-list';
        }
        const dt = document.createElement('dt');
        const dtIcon = createIconSpan('item', subKey);
        if (dtIcon) {
          dt.appendChild(dtIcon);
        }
        const dtLabel = document.createElement('span');
        dtLabel.textContent = subKey;
        dt.appendChild(dtLabel);
        const dd = document.createElement('dd');
        dd.textContent = extractEntryValue(subValue) || '—';
        subList.append(dt, dd);
      });

      if (subList) {
        subDetails.appendChild(subList);
      }

      content.appendChild(subDetails);
      return;
    }

    ensureList();

    if (Array.isArray(value) && value.length && typeof value[0] === 'object' && value[0].$meta) {
      const dt = document.createElement('dt');
      const dtIcon = createIconSpan('item', key);
      if (dtIcon) {
        dt.appendChild(dtIcon);
      }
      const dtLabel = document.createElement('span');
      dtLabel.textContent = key;
      dt.appendChild(dtLabel);
      const dd = document.createElement('dd');
      dd.textContent = '（待扩展条目）';
      currentList.append(dt, dd);
      return;
    }

    const dt = document.createElement('dt');
    const dtIcon = createIconSpan('item', key);
    if (dtIcon) {
      dt.appendChild(dtIcon);
    }
    const dtLabel = document.createElement('span');
    dtLabel.textContent = key;
    dt.appendChild(dtLabel);
    const dd = document.createElement('dd');
    dd.textContent = extractEntryValue(value) || '—';
    currentList.append(dt, dd);
  });

  flushList();

  if (collapseControls) {
    collapseControls.setCollapsed(false);
    collapseControls.refresh();
  }

  return section;
}

function renderStatusBar(state) {
  if (typeof window === 'undefined' || !window.document) {
    return;
  }

  const root = document.querySelector('#st-ext-status-bar');
  const container = root || createStatusBarContainer();
  const body = container.querySelector('.st-ext-status-body');
  body.innerHTML = '';

  let odeValue = null;

  Object.entries(state).forEach(([sectionTitle, sectionValue]) => {
    if (sectionTitle === '宿命诗') {
      odeValue = sectionValue;
      return;
    }

    if (sectionTitle === '关系表') {
      const { section, content, collapseControls } = createSectionShell(sectionTitle, {
        collapsible: COLLAPSIBLE_SECTIONS.has(sectionTitle)
      });
      const info = document.createElement('p');
      info.className = 'st-ext-status-placeholder';
      appendIconAndText(info, createIconSpan('item', sectionTitle), '（暂无羁绊记录）');
      content.appendChild(info);
      if (collapseControls) {
        collapseControls.setCollapsed(false);
        collapseControls.refresh();
      }
      body.appendChild(section);
      return;
    }

    if (Array.isArray(sectionValue)) {
      const { section, content, collapseControls } = createSectionShell(sectionTitle, {
        collapsible: COLLAPSIBLE_SECTIONS.has(sectionTitle)
      });
      const info = document.createElement('p');
      info.className = 'st-ext-status-placeholder';
      appendIconAndText(info, createIconSpan('item', sectionTitle), extractEntryValue(sectionValue) || '（待补充）');
      content.appendChild(info);
      if (collapseControls) {
        collapseControls.setCollapsed(false);
        collapseControls.refresh();
      }
      body.appendChild(section);
      return;
    }

    if (sectionValue && typeof sectionValue === 'object') {
      const section = renderPrimitiveSection(sectionTitle, sectionValue);
      body.appendChild(section);
      return;
    }

    const { section, content, collapseControls } = createSectionShell(sectionTitle, {
      collapsible: COLLAPSIBLE_SECTIONS.has(sectionTitle)
    });
    const info = document.createElement('p');
    info.className = 'st-ext-status-placeholder';
    appendIconAndText(info, createIconSpan('item', sectionTitle), sectionValue || '—');
    content.appendChild(info);
    if (collapseControls) {
      collapseControls.setCollapsed(false);
      collapseControls.refresh();
    }
    body.appendChild(section);
  });

  if (odeValue !== null) {
    const section = document.createElement('section');
    section.className = 'st-ext-status-ode';

    const title = document.createElement('div');
    title.className = 'st-ext-display-title';
    title.textContent = '宿命诗';
    section.appendChild(title);

    const odeEpithet = createSectionEpithet('宿命诗', {
      tagName: 'div',
      className: 'st-ext-ode-epithet'
    });
    if (odeEpithet) {
      section.appendChild(odeEpithet);
    }

    const content = document.createElement('p');
    content.className = 'st-ext-status-ode-content';
    content.textContent = extractEntryValue(odeValue) || '（暂无诗篇）';
    section.appendChild(content);

    body.appendChild(section);
  }

  if (!root) {
    document.body.appendChild(container);
  }
}

function injectStatusBarStyles() {
  if (typeof window === 'undefined' || !window.document) {
    return;
  }

  if (document.getElementById('st-ext-status-bar-style')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'st-ext-status-bar-style';
  style.textContent = `
    #st-ext-status-bar {
      position: fixed;
      top: 16px;
      right: 16px;
      width: 340px;
      max-height: 80vh;
      overflow-y: auto;
      padding: 22px 22px 26px;
      background: linear-gradient(145deg, rgba(246, 235, 212, 0.94), rgba(230, 210, 174, 0.96));
      color: #45321a;
      border-radius: 20px;
      border: 1px solid rgba(117, 94, 60, 0.35);
      box-shadow: 0 20px 44px rgba(98, 72, 41, 0.32);
      background-image:
        radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.42), transparent 60%),
        radial-gradient(circle at 82% 88%, rgba(210, 181, 136, 0.38), transparent 68%);
      font-family: "ZCOOL XiaoWei", "Songti SC", "STSong", "Noto Serif SC", serif;
      z-index: 10000;
      isolation: isolate;
      scrollbar-width: thin;
      scrollbar-color: rgba(152, 118, 72, 0.55) transparent;
      backdrop-filter: blur(3px);
    }

    #st-ext-status-bar::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background:
        repeating-linear-gradient(140deg, rgba(124, 95, 58, 0.05) 0 16px, transparent 16px 32px),
        repeating-linear-gradient(40deg, rgba(255, 255, 255, 0.08) 0 18px, transparent 18px 36px);
      mix-blend-mode: multiply;
      opacity: 0.55;
      pointer-events: none;
      z-index: -1;
    }

    #st-ext-status-bar::after {
      content: "";
      position: absolute;
      inset: 4px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.32);
      pointer-events: none;
      z-index: -1;
    }

    #st-ext-status-bar::-webkit-scrollbar {
      width: 6px;
    }

    #st-ext-status-bar::-webkit-scrollbar-thumb {
      background: rgba(152, 118, 72, 0.55);
      border-radius: 999px;
    }

    #st-ext-status-bar::-webkit-scrollbar-track {
      background: transparent;
    }

    #st-ext-status-bar .st-ext-status-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      padding-bottom: 14px;
      margin-bottom: 18px;
      border-bottom: 1px dashed rgba(117, 94, 60, 0.35);
      position: relative;
    }

    #st-ext-status-bar .st-ext-status-header::after {
      content: "";
      position: absolute;
      bottom: -1px;
      width: 72%;
      height: 2px;
      background: linear-gradient(90deg, rgba(199, 155, 48, 0), rgba(199, 155, 48, 0.55), rgba(199, 155, 48, 0));
      transform: translateY(50%);
      pointer-events: none;
    }

    #st-ext-status-bar .st-ext-status-body {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    #st-ext-status-bar .st-ext-display-title {
      font-size: 1.92rem;
      letter-spacing: 0.18em;
      font-weight: 700;
      color: #cfa63a;
      text-align: center;
      width: 100%;
      text-shadow: 0 2px 6px rgba(138, 94, 28, 0.35);
    }

    #st-ext-status-bar .st-ext-status-title {
      display: block;
      text-align: center;
    }

    #st-ext-status-bar .st-ext-status-sub {
      font-size: 0.78rem;
      color: rgba(101, 72, 36, 0.68);
      letter-spacing: 0.18em;
    }

    #st-ext-status-bar .st-ext-status-section {
      margin: 0;
      padding: 14px 16px 16px;
      background: rgba(255, 249, 236, 0.68);
      border-radius: 14px;
      border: 1px solid rgba(138, 105, 60, 0.25);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
      position: relative;
    }

    #st-ext-status-bar .st-ext-status-section::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border: 1px solid rgba(255, 255, 255, 0.3);
      pointer-events: none;
      opacity: 0.65;
      z-index: 0;
    }

    #st-ext-status-bar .st-ext-status-section::after {
      content: "";
      position: absolute;
      right: 18px;
      top: 12px;
      width: 42px;
      height: 42px;
      background: radial-gradient(circle at 0% 0%, rgba(199, 155, 48, 0.18), transparent 72%);
      pointer-events: none;
      z-index: 0;
    }

    #st-ext-status-bar .st-ext-status-section > * {
      position: relative;
      z-index: 1;
    }

    #st-ext-status-bar .st-ext-status-section:hover {
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 4px 12px rgba(122, 92, 58, 0.16);
    }

    #st-ext-status-bar .st-ext-status-heading,
    #st-ext-status-bar .st-ext-status-subheading {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
    }

    #st-ext-status-bar .st-ext-status-heading {
      font-size: 1.05rem;
      color: #5d4426;
      letter-spacing: 0.08em;
      margin-bottom: 8px;
      font-weight: 600;
    }

    #st-ext-status-bar .st-ext-status-heading::after {
      content: "";
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(101, 72, 36, 0.18), rgba(101, 72, 36, 0), rgba(101, 72, 36, 0));
    }

    #st-ext-status-bar .st-ext-status-subheading {
      font-size: 0.9rem;
      margin: 10px 0 6px;
      color: #6b4d28;
      letter-spacing: 0.05em;
      position: relative;
    }

    #st-ext-status-bar .st-ext-status-subheading::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 34px;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, rgba(120, 83, 40, 0.25), rgba(120, 83, 40, 0));
    }

    #st-ext-status-bar .st-ext-heading-text {
      flex: 0 0 auto;
    }

    #st-ext-status-bar .st-ext-heading-epithet {
      margin-left: auto;
      font-size: 0.76rem;
      letter-spacing: 0.16em;
      color: rgba(119, 88, 44, 0.85);
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      font-weight: 500;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
    }

    #st-ext-status-bar .st-ext-heading-epithet::before,
    #st-ext-status-bar .st-ext-heading-epithet::after {
      color: rgba(199, 155, 72, 0.8);
    }

    #st-ext-status-bar .st-ext-heading-epithet::before {
      content: '「';
      margin-right: 3px;
    }

    #st-ext-status-bar .st-ext-heading-epithet::after {
      content: '」';
      margin-left: 3px;
    }

    #st-ext-status-bar .st-ext-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 999px;
      border: 1px solid rgba(149, 119, 77, 0.35);
      background: radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.68), rgba(217, 189, 140, 0.18));
      box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.45);
      color: #71542f;
      flex-shrink: 0;
    }

    #st-ext-status-bar .st-ext-icon svg {
      width: 74%;
      height: 74%;
    }

    #st-ext-status-bar .st-ext-icon-subgroup,
    #st-ext-status-bar .st-ext-icon-item {
      width: 22px;
      height: 22px;
      border-width: 1px;
    }

    #st-ext-status-bar .st-ext-status-list {
      display: grid;
      grid-template-columns: minmax(110px, 128px) 1fr;
      gap: 6px 12px;
      margin: 0;
    }

    #st-ext-status-bar .st-ext-status-list dt {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: rgba(92, 68, 37, 0.9);
      letter-spacing: 0.04em;
    }

    #st-ext-status-bar .st-ext-status-list dd {
      margin: 0;
      font-size: 0.84rem;
      color: #3b2916;
      font-weight: 500;
      padding: 4px 10px;
      background: rgba(255, 248, 235, 0.72);
      border-radius: 9px;
      border: 1px solid rgba(184, 149, 96, 0.18);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }

    #st-ext-status-bar .st-ext-status-placeholder {
      margin: 0;
      font-size: 0.82rem;
      color: rgba(88, 64, 37, 0.75);
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 248, 235, 0.6);
      border-radius: 9px;
      border: 1px dashed rgba(184, 149, 96, 0.38);
      padding: 6px 10px;
      font-style: italic;
    }

    #st-ext-status-bar .st-ext-status-subgroup {
      padding: 8px 0 0;
      border-top: 1px dashed rgba(140, 107, 66, 0.24);
      margin-top: 6px;
    }

    #st-ext-status-bar .st-ext-status-subgroup:first-of-type {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }

    #st-ext-status-bar .st-ext-section-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 6px;
    }

    #st-ext-status-bar .st-ext-collapsible .st-ext-section-content {
      overflow: hidden;
    }

    #st-ext-status-bar .st-ext-collapsible-trigger {
      cursor: pointer;
      user-select: none;
      border-radius: 10px;
      padding: 2px 6px;
      transition: background ${COLLAPSE_ANIMATION_MS}ms ease, color ${COLLAPSE_ANIMATION_MS}ms ease;
    }

    #st-ext-status-bar .st-ext-collapsible-trigger:hover {
      background: rgba(210, 178, 128, 0.18);
    }

    #st-ext-status-bar .st-ext-collapsible-trigger:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px rgba(199, 155, 48, 0.45);
    }

    #st-ext-status-bar .st-ext-collapse-indicator {
      margin-left: 12px;
      display: inline-flex;
      width: 18px;
      height: 18px;
      align-items: center;
      justify-content: center;
      color: rgba(116, 88, 52, 0.88);
      transition: transform ${COLLAPSE_ANIMATION_MS}ms ease;
    }

    #st-ext-status-bar .st-ext-collapsible.is-collapsed .st-ext-collapse-indicator {
      transform: rotate(-90deg);
    }

    #st-ext-status-bar .st-ext-collapsible.is-collapsed .st-ext-section-content {
      opacity: 0;
    }

    #st-ext-status-bar .st-ext-collapsible .st-ext-section-content {
      opacity: 1;
      transition: opacity ${COLLAPSE_ANIMATION_MS}ms ease;
    }

    #st-ext-status-bar .st-ext-status-ode {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding-top: 20px;
      margin: 4px 0 0;
      border-top: 1px dashed rgba(117, 94, 60, 0.35);
    }

    #st-ext-status-bar .st-ext-status-ode::before {
      content: "";
      width: 68%;
      height: 1px;
      background: linear-gradient(90deg, rgba(199, 155, 48, 0), rgba(199, 155, 48, 0.55), rgba(199, 155, 48, 0));
    }

    #st-ext-status-bar .st-ext-ode-epithet {
      font-size: 0.82rem;
      color: rgba(117, 86, 45, 0.85);
      letter-spacing: 0.18em;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);
    }

    #st-ext-status-bar .st-ext-status-ode-content {
      margin: 0;
      font-size: 0.94rem;
      color: #cfa63a;
      font-weight: 700;
      letter-spacing: 0.12em;
      white-space: pre-line;
      padding: 10px 18px;
      border-radius: 12px;
      border: 1px solid rgba(199, 155, 48, 0.42);
      background: rgba(255, 248, 235, 0.66);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 8px 18px rgba(112, 82, 46, 0.18);
      text-shadow: 0 1px 4px rgba(98, 68, 24, 0.35);
    }

    @media (prefers-reduced-motion: reduce) {
      #st-ext-status-bar {
        backdrop-filter: none;
      }

      #st-ext-status-bar .st-ext-collapsible .st-ext-section-content,
      #st-ext-status-bar .st-ext-collapse-indicator,
      #st-ext-status-bar .st-ext-collapsible-trigger {
        transition: none !important;
      }
    }
  `;

  document.head.appendChild(style);
}

function setupStatusBarSkeleton(state) {
  if (typeof window === 'undefined' || !window.document) {
    return;
  }

  const bootstrap = () => {
    injectStatusBarStyles();
    renderStatusBar(state);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  } else {
    bootstrap();
  }
}

// ------ 扩展：多角色聊天分割与渲染主函数 ------
function formatAndRenderMultiRoleChat(inputText) {
  // 分割正则
  const regex = /\[([^\]\n]+)\]\s*([\s\S]*?)(?=\n\[[^\]]+\]|$)/g;
  let match;
  while ((match = regex.exec(inputText)) !== null) {
    const roleName = match[1].trim();
    const content = match[2].trim();
    const avatar = avatarMap[roleName] || avatarMap["默认"];

    // 格式化消息 HTML（自定义美化格式）
    const html = `
      <div style="display:flex;align-items:flex-start;margin-bottom:8px;">
        <img src="${avatar}" alt="${roleName}" style="width:48px;height:48px;border-radius:50%;margin-right:10px;">
        <div>
          <strong style="font-size:1.1em;color:#336;">${roleName}</strong>
          <div style="white-space:pre-line;margin-top:3px;">${content}</div>
        </div>
      </div>
    `;
    
    // SillyTavern扩展API：插入为新的消息楼层
    if (window?.TavernHelper?.builtin?.addOneMessage) {
      window.TavernHelper.builtin.addOneMessage(
        {
          name: roleName,
          role: 'assistant',
          message: html,
          data: {}
        },
        { type: 'normal', showSwipes: false }
      );
    } else {
      // 非扩展环境调试输出
      console.log(`[${roleName}]`, content);
    }
  }
}

// 注册按钮到扩展侧栏，实现一键粘贴批量格式化
function setupMultiRoleFormatterButton() {
  if (window?.TavernHelper?.appendInexistentScriptButtons) {
    window.TavernHelper.appendInexistentScriptButtons([
      { name: '批量格式化多角色聊天', visible: true }
    ]);
    const eventType = window.getButtonEvent?.('批量格式化多角色聊天');
    if (eventType) {
      window.eventOn(eventType, async () => {
        let txt = prompt("粘贴或输入多角色聊天文本:\n\n格式：[角色名] 内容...");
        if (txt) {
          formatAndRenderMultiRoleChat(txt);
        }
      });
    }
  }
}

// 扩展加载时自动注册按钮
setupMultiRoleFormatterButton();

// 支持全局调用
window.multiRoleChatFormatter = formatAndRenderMultiRoleChat;

// 初始化状态栏骨架
setupStatusBarSkeleton(initialStatusBarState);
