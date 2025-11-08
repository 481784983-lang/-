const DATA = {
  genders: [
    { key: 'male', label: '男' },
    { key: 'female', label: '女' },
    { key: 'fluid', label: '流光之性' },
    { key: 'custom', label: '自定义' }
  ],
  appearances: [
    { id: 'heroic', label: '剑眉星目，披风猎猎的侠客气质' },
    { id: 'elegant', label: '青衫如竹，举止温雅沉静' },
    { id: 'mystic', label: '墨发如瀑，金瞳映着灵光' },
    { id: 'scarred', label: '满身旧伤，眉宇坚毅如磐石' },
    { id: 'gentle', label: '眉目柔和，笑意如春风' }
  ],
  eras: [
    { id: 'yellow_turban', label: '黄巾烽起 · 中平元年 (184 年)', detail: '张角揭竿，民心震荡，诸侯暗潮涌动。' },
    { id: 'qilin_fire', label: '麒麟火落 · 光和七年 (184 年末)', detail: '洛阳上空坠落异火，群雄争探天意。' },
    { id: 'luoyang_siege', label: '洛阳将倾 · 中平六年 (189 年)', detail: '董卓挟天子迁都，洛阳城内军阀相逼。' },
    { id: 'coalition_muster', label: '十八路会盟 · 初平元年 (190 年)', detail: '群雄会盟虎牢，征战号角响彻九州。' },
    { id: 'phoenix_uprising', label: '凤鸣江东 · 初平二年 (191 年)', detail: '江东势起，江海间隐现神秘凤凰之兆。' }
  ],
  races: [
    {
      id: 'yanhan',
      name: '炎汉世家',
      description: '中原旧贵的血脉传承者，熟悉朝堂律令与兵法秘闻。',
      identities: [
        {
          key: 'yanhan_scribe',
          name: '洛阳书吏',
          cost: 4,
          desc: '受业于鸿都门学，以笔墨掌控情报与文书。',
          hook: '奉命编纂失落的《玄武兵录》，卷宗引出禁忌秘辛。',
          locations: ['洛阳·宣德坊', '太学讲堂', '洛水渡口', '鸿都门学', '未央坊藏书阁']
        },
        {
          key: 'yanhan_guard',
          name: '虎贲游骑',
          cost: 8,
          desc: '身披铁甲，护卫洛阳禁宫的精锐骑兵。',
          hook: '守备虎牢关时遭遇异象，需要调查神秘军阵。',
          locations: ['洛阳·武德殿', '虎牢前线营地', '洛阳西营', '北邙狩猎场', '校尉府训练场']
        },
        {
          key: 'yanhan_spy',
          name: '细作主事',
          cost: 9,
          desc: '司隶校尉麾下暗探首领，精于潜伏与策反。',
          hook: '暗部失联，需在乱世之中重建隐秘情报网。',
          locations: ['洛阳·暗巷', '司隶密坊', '成皋驿馆', '函谷关秘室', '闻香楼隐阁']
        },
        {
          key: 'yanhan_alchemist',
          name: '丹青祭酒',
          cost: 7,
          desc: '嵩岳道院赐职，以丹药和阵法辅佐王室。',
          hook: '受命调制镇社灵丹，却发现药引竟与皇室血脉相连。',
          locations: ['嵩岳道院', '少室炼丹台', '天枢观', '嵩阳祭坛', '洛阳丹坊']
        },
        {
          key: 'yanhan_bard',
          name: '宫廷琴师',
          cost: 5,
          desc: '穿梭宫阙与权贵府邸，乐音可安人心亦可传密谕。',
          hook: '琴谱《凤落云霄》遗失，牵出宫中暗线。',
          locations: ['长乐宫前殿', '金銮台', '东市雅集', '相国府雅院', '宜春苑水榭']
        }
      ],
      talents: [
        { key: 'dragon_blood', name: '龙脉映血', cost: 9, desc: '觉醒炎汉王族的残存龙脉，武力与统御皆大幅提升。', tags: ['血脉', '武力+谋略'] },
        { key: 'blade_edge', name: '锋芒毕露', cost: 6, desc: '刀剑合一，实战中武力检定+8。', tags: ['武技'] },
        { key: 'benevolent_plan', name: '仁策妙算', cost: 5, desc: '熟稔朝局，谋略检定+6，并可调动朝廷资源一次。', tags: ['谋略'] },
        { key: 'tiger_spirit', name: '虎臣胆识', cost: 4, desc: '无惧战阵，每场战斗首次受创减半。', tags: ['防御'] },
        { key: 'literati', name: '文墨天成', cost: 3, desc: '琴棋书画皆通，魅力检定+5。', tags: ['魅力'] }
      ]
    },
    {
      id: 'yunlan',
      name: '云岚妖族',
      description: '栖息青丘的灵狐与羽族后裔，善于变化与风行。',
      identities: [
        {
          key: 'yunlan_wanderer',
          name: '青丘行者',
          cost: 6,
          desc: '巡游雾林，维系妖族与人界的联络者。',
          hook: '雾林中浮现断裂的远古阵痕，需要重启山海通道。',
          locations: ['青丘雾林', '碧落台', '灵狐洞府', '燕丘渡口', '云岚市集']
        },
        {
          key: 'yunlan_priest',
          name: '风祈祭司',
          cost: 8,
          desc: '侍奉风神，掌控天象与祝祷的祭司。',
          hook: '守护风祭坛之风眼被封，需要取回失落风铃。',
          locations: ['风祭坛', '神巫殿', '赤霞峰顶', '风歌峡谷', '灵息神树']
        },
        {
          key: 'yunlan_assassin',
          name: '影织刺客',
          cost: 10,
          desc: '操纵影丝的刺客，善于突然袭击与隐匿。',
          hook: '受命暗杀叛族长老，却发现对方掌握族群秘密。',
          locations: ['暗影裂隙', '夜幕集市', '雾隐巷', '幽翎驿馆', '青丘下城']
        },
        {
          key: 'yunlan_scout',
          name: '天穹斥候',
          cost: 7,
          desc: '御风巡空的侦查者，肩负守护边界之责。',
          hook: '浮空堡垒出现裂缝，需追查来自星海的异族踪迹。',
          locations: ['苍穹瞭望台', '风暴壁垒', '凌霄天阶', '高空猎场', '浮空驿站']
        },
        {
          key: 'yunlan_tamer',
          name: '灵兽驭师',
          cost: 9,
          desc: '与灵兽签订契约，驾驭百兽冲锋。',
          hook: '契约兽暴走，疑遭邪祟侵蚀，需要净化灵魂枷锁。',
          locations: ['灵兽栈', '朝云谷', '腾雾盆地', '星辉驯养所', '御风石圈']
        }
      ],
      talents: [
        { key: 'nine_tail', name: '九尾幻形', cost: 9, desc: '可化九种姿态，魅力与潜行检定+7。', tags: ['幻术', '魅力'] },
        { key: 'windstep', name: '风羽轻灵', cost: 6, desc: '御风疾行，移动与闪避判定+6。', tags: ['身法'] },
        { key: 'cloud_heal', name: '云息疗愈', cost: 5, desc: '牺牲自身法力，为队友恢复大量命值。', tags: ['治疗'] },
        { key: 'mist_walk', name: '雾隐步', cost: 4, desc: '可于雾气中隐身一次，短暂免疫远程打击。', tags: ['潜行'] },
        { key: 'spirit_sight', name: '灵眸感知', cost: 3, desc: '感应百里内灵力波动，洞察隐藏敌意。', tags: ['洞察'] }
      ]
    },
    {
      id: 'xiling',
      name: '西陵灵裔',
      description: '承载星辉与秘纹的古老氏族，守护着失落的灵塔。',
      identities: [
        {
          key: 'xiling_astrologer',
          name: '星命占官',
          cost: 8,
          desc: '解读星象，为各地诸侯推演命盘。',
          hook: '星盘出现“逆行之星”，需查明是神迹或灾厄。',
          locations: ['西陵星台', '斗宿坛城', '星纹密室', '灵潮港', '观星峡']
        },
        {
          key: 'xiling_smith',
          name: '玄铁铸魂',
          cost: 7,
          desc: '掌握熔铸灵兵的技艺，使兵器孕育灵魂。',
          hook: '玄铁熔城被邪火侵蚀，必须寻回圣火种。',
          locations: ['玄铁熔城', '赤炎工坊', '灵火矿坑', '锻星坞', '烈焰回廊']
        },
        {
          key: 'xiling_songstress',
          name: '月霜歌者',
          cost: 5,
          desc: '以歌声疗愈灵魂，安抚战后创伤。',
          hook: '霜影水榭中歌谱残缺，藏着流亡王族的讯息。',
          locations: ['月霜剧场', '银辉湖畔', '霜影水榭', '月澜广场', '寒鸢驿站']
        },
        {
          key: 'xiling_guardian',
          name: '断碑守卫',
          cost: 6,
          desc: '守护古老断碑与灵塔的忠诚卫士。',
          hook: '灵塔封印松动，必须阻止异界魔灵突破。',
          locations: ['断碑要塞', '灵塔禁地', '星门巡廊', '玄甲营地', '寂光坟场']
        },
        {
          key: 'xiling_archivist',
          name: '失落档司',
          cost: 9,
          desc: '管理遗典档案，能追溯千年秘闻。',
          hook: '光阴走廊的卷轴被盗，线索指向被封印的星门。',
          locations: ['遗典藏库', '光阴走廊', '虚纹档案室', '古今书林', '离砂浮岛']
        }
      ],
      talents: [
        { key: 'starlight', name: '星辉护佑', cost: 8, desc: '引星辉护体，法力与防御检定+6。', tags: ['法术护盾'] },
        { key: 'resonance', name: '灵域共鸣', cost: 6, desc: '与灵塔共鸣，施法速度与范围提升。', tags: ['共鸣'] },
        { key: 'moon_frost', name: '月白冰魄', cost: 5, desc: '驾驭月霜寒气，造成范围减速。', tags: ['冰霜'] },
        { key: 'soulforge', name: '铸魂定志', cost: 4, desc: '免疫一次精神控制，稳定意志。', tags: ['心志'] },
        { key: 'ghostlight', name: '幽灯巡照', cost: 3, desc: '召唤灵灯照明，驱散幻术与妖影。', tags: ['侦测'] }
      ]
    }
  ],
  spells: [
    { key: 'taixuan', name: '太玄引气', cost: 3, desc: '凝聚天地灵气，短暂提升命与法上限。', tags: ['增益'] },
    { key: 'wind_ride', name: '御风履霄', cost: 4, desc: '御风而行，可跨越险峻地形。', tags: ['位移'] },
    { key: 'flame_heart', name: '炎心炼炁', cost: 4, desc: '激发体内真火，下一次攻击附带灼烧。', tags: ['火焰'] },
    { key: 'star_shower', name: '星落灵光', cost: 5, desc: '召唤星光坠落，对范围敌人造成法伤。', tags: ['范围'] },
    { key: 'shadow_bind', name: '影缚咒', cost: 3, desc: '以影子束缚目标，使其暂时定身。', tags: ['控制'] },
    { key: 'guardian_talisman', name: '山海护符', cost: 2, desc: '布下护符，抵御一次致命伤害。', tags: ['防御'] }
  ],
  flaws: [
    { key: 'old_wound', name: '旧伤难愈', cost: 2, desc: '过去的战创未愈，剧烈运动后需休整。' },
    { key: 'chaotic_meridian', name: '灵脉紊乱', cost: 3, desc: '偶发灵脉失调，施法有小概率失败。' },
    { key: 'night_blind', name: '夜盲症', cost: 1, desc: '夜间视力受限，暗处行动难度提升。' },
    { key: 'poison_scar', name: '毒痕潜伏', cost: 2, desc: '体内残留毒素，持续消耗少量命值。' },
    { key: 'soul_fracture', name: '魂魄裂痕', cost: 4, desc: '精神被神秘力量撕裂，易受精神攻击影响。' }
  ],
  equipment: [
    { key: 'bronze_sword', name: '赤铜长剑', cost: 3, desc: '锋锐轻巧的长剑，出鞘自带鸣音。', tags: ['武器'] },
    { key: 'snow_bow', name: '雪羽长弓', cost: 4, desc: '以雪狐筋制弦，远程命中率更高。', tags: ['远程'] },
    { key: 'iron_fan', name: '玄铁折扇', cost: 2, desc: '兼具兵刃与礼仪，可暗藏机括毒针。', tags: ['暗器'] },
    { key: 'soul_armor', name: '镇魂铁甲', cost: 5, desc: '铭刻灵纹的甲胄，可抵御法术攻击。', tags: ['防具'] },
    { key: 'spirit_amulet', name: '灵纹护符', cost: 3, desc: '提供额外法力护罩，增强仙术施展。', tags: ['饰品'] },
    { key: 'wind_dagger', name: '风行短刃', cost: 2, desc: '轻盈短刃，适合贴身作战与突刺。', tags: ['近战'] }
  ],
  items: [
    { key: 'tiger_token', name: '虎牢遗令', cost: 2, desc: '刻有虎牢兵符印记，可号召边军协助。' },
    { key: 'spirit_incense', name: '青丘灵香', cost: 3, desc: '点燃后可与灵兽沟通，亦能驱散秽气。' },
    { key: 'star_compass', name: '星陨罗盘', cost: 4, desc: '追踪星力流向，寻找秘境入口。' },
    { key: 'onyx_letter', name: '墨玉信笺', cost: 2, desc: '记录密语的黑玉信札，只能由持有者解读。' },
    { key: 'clockwork_gem', name: '千机巧石', cost: 3, desc: '嵌入机关后可自动破解复杂锁阵。' },
    { key: 'tide_leaf', name: '玄潮贝叶', cost: 2, desc: '随身携带可抵御一次水系灾厄。' }
  ]
};

const state = {
  totalPoints: 36,
  raceId: null,
  identityKey: null,
  talents: new Set(),
  spells: new Set(),
  flaws: new Set(),
  equipment: new Set(),
  items: new Set(),
  eraKey: '',
  locationKey: '',
  appearanceId: '',
  name: '',
  age: '',
  genderKey: 'male',
  custom: {
    gender: '',
    appearance: '',
    era: '',
    location: ''
  },
  lastRoll: [],
  spent: 0
};

const dom = {
  pointsTotal: document.querySelector('[data-role="points-total"]'),
  pointsSpent: document.querySelector('[data-role="points-spent"]'),
  pointsRemaining: document.querySelector('[data-role="points-remaining"]'),
  pointsProgress: document.querySelector('[data-role="points-progress"]'),
  rollDetail: document.querySelector('[data-role="roll-detail"]'),
  summaryList: document.querySelector('[data-role="selection-summary"]'),
  feedback: document.querySelector('[data-role="feedback"]'),
  nameInput: document.getElementById('name-input'),
  ageInput: document.getElementById('age-input'),
  genderSelect: document.getElementById('gender-select'),
  genderCustomWrap: document.querySelector('[data-role="gender-custom"]'),
  genderCustomInput: document.getElementById('gender-custom-input'),
  appearanceGroup: document.querySelector('[data-role="appearance-options"]'),
  appearanceCustomWrap: document.querySelector('[data-role="appearance-custom"]'),
  appearanceCustomInput: document.getElementById('appearance-custom'),
  raceSelect: document.getElementById('race-select'),
  identityContainer: document.querySelector('[data-options="identity"]'),
  eraSelect: document.getElementById('era-select'),
  eraCustomWrap: document.querySelector('[data-role="era-custom"]'),
  eraCustomInput: document.getElementById('era-custom-input'),
  locationSelect: document.getElementById('location-select'),
  locationCustomWrap: document.querySelector('[data-role="location-custom"]'),
  locationCustomInput: document.getElementById('location-custom-input'),
  talentContainer: document.querySelector('[data-options="talent"]'),
  spellContainer: document.querySelector('[data-options="spell"]'),
  flawContainer: document.querySelector('[data-options="flaw"]'),
  equipmentContainer: document.querySelector('[data-options="equipment"]'),
  itemContainer: document.querySelector('[data-options="item"]'),
  backgroundButton: document.getElementById('generate-background'),
  backgroundOutput: document.getElementById('background-output'),
  startButton: document.getElementById('start-button'),
  startSummary: document.querySelector('[data-role="start-summary"]'),
  rollButton: document.getElementById('roll-button')
};

let feedbackTimer;

function currentRace() {
  return DATA.races.find((race) => race.id === state.raceId) || null;
}

function findByKey(collection, key) {
  return collection.find((item) => item.key === key) || null;
}

function renderGenderOptions() {
  dom.genderSelect.innerHTML = '';
  DATA.genders.forEach((option) => {
    const opt = document.createElement('option');
    opt.value = option.key;
    opt.textContent = option.label;
    dom.genderSelect.appendChild(opt);
  });
  dom.genderSelect.value = state.genderKey;
  toggleCustomGender(state.genderKey === 'custom');
}

function renderRaceOptions() {
  dom.raceSelect.innerHTML = '';
  DATA.races.forEach((race) => {
    const option = document.createElement('option');
    option.value = race.id;
    option.textContent = `${race.name}｜${race.description}`;
    dom.raceSelect.appendChild(option);
  });
}

function renderEraOptions() {
  dom.eraSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = '请选择初始时间';
  dom.eraSelect.appendChild(placeholder);
  DATA.eras.forEach((era) => {
    const option = document.createElement('option');
    option.value = era.id;
    option.textContent = era.label;
    option.dataset.detail = era.detail;
    dom.eraSelect.appendChild(option);
  });
  const custom = document.createElement('option');
  custom.value = 'custom';
  custom.textContent = '自定义时间';
  dom.eraSelect.appendChild(custom);
}

function renderAppearanceOptions() {
  const group = dom.appearanceGroup;
  group.innerHTML = '';
  const radios = [];

  DATA.appearances.forEach((appearance, index) => {
    const label = document.createElement('label');
    label.className = 'chip';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'appearance';
    input.value = appearance.id;
    if (state.appearanceId) {
      input.checked = state.appearanceId === appearance.id;
    } else if (index === 0) {
      input.checked = true;
      state.appearanceId = appearance.id;
    }
    label.appendChild(input);
    label.append(appearance.label);
    group.appendChild(label);
    radios.push({ label, input });
  });

  const customLabel = document.createElement('label');
  customLabel.className = 'chip';
  const customInput = document.createElement('input');
  customInput.type = 'radio';
  customInput.name = 'appearance';
  customInput.value = 'custom';
  customInput.checked = state.appearanceId === 'custom';
  customLabel.appendChild(customInput);
  customLabel.append('自定义');
  group.appendChild(customLabel);
  radios.push({ label: customLabel, input: customInput });

  function updateAppearanceActive() {
    radios.forEach(({ label, input }) => {
      label.classList.toggle('is-active', input.checked);
    });
    const show = customInput.checked;
    dom.appearanceCustomWrap.classList.toggle('hidden', !show);
    if (!show && state.appearanceId === 'custom') {
      state.custom.appearance = dom.appearanceCustomInput.value.trim();
    }
  }

  radios.forEach(({ input }) => {
    input.addEventListener('change', (event) => {
      state.appearanceId = event.target.value;
      updateAppearanceActive();
    });
  });

  updateAppearanceActive();
}

function buildOptionCard(option, type, inputType, groupName) {
  const label = document.createElement('label');
  label.className = 'option-card';

  const input = document.createElement('input');
  input.type = inputType;
  input.value = option.key;
  if (groupName) {
    input.name = groupName;
  }
  label.appendChild(input);

  const shell = document.createElement('div');
  shell.className = 'option-shell';

  const header = document.createElement('div');
  header.className = 'option-shell__header';
  const name = document.createElement('span');
  name.className = 'option-name';
  name.textContent = option.name;
  const cost = document.createElement('span');
  cost.className = 'option-cost';
  cost.textContent = `消耗 ${option.cost} 点`;
  header.append(name, cost);
  shell.appendChild(header);

  if (option.desc) {
    const desc = document.createElement('p');
    desc.className = 'option-desc';
    desc.textContent = option.desc;
    shell.appendChild(desc);
  }

  if (type === 'identity' && Array.isArray(option.locations)) {
    const hint = document.createElement('div');
    hint.className = 'option-tags';
    hint.textContent = `起始地点示例：${option.locations.slice(0, 3).join('、')}`;
    shell.appendChild(hint);
  } else if (Array.isArray(option.tags) && option.tags.length > 0) {
    const tags = document.createElement('div');
    tags.className = 'option-tags';
    option.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'option-tag';
      span.textContent = tag;
      tags.appendChild(span);
    });
    shell.appendChild(tags);
  }

  label.appendChild(shell);

  return { label, input };
}

function renderIdentityOptions(race) {
  dom.identityContainer.innerHTML = '';
  if (!race) {
    return;
  }

  race.identities.forEach((identity) => {
    const { label, input } = buildOptionCard(identity, 'identity', 'radio', 'identity');
    input.checked = state.identityKey === identity.key;
    input.addEventListener('change', () => {
      const previous = state.identityKey;
      state.identityKey = identity.key;
      state.locationKey = '';
      state.custom.location = '';
      const spent = calculateSpent();
      if (spent > state.totalPoints) {
        state.identityKey = previous;
        input.checked = false;
        if (previous) {
          const previousInput = dom.identityContainer.querySelector(`input[value="${previous}"]`);
          if (previousInput) {
            previousInput.checked = true;
          }
        }
        showFeedback('天命点不足，无法选择该身份。');
        renderLocationOptions(previous ? findByKey(race.identities, previous) : null);
        updatePointsDisplay();
        return;
      }
      renderLocationOptions(identity);
      updatePointsDisplay();
    });
    dom.identityContainer.appendChild(label);
  });
}

function renderTalentOptions(race) {
  dom.talentContainer.innerHTML = '';
  if (!race) {
    return;
  }
  race.talents.forEach((talent) => {
    const { label, input } = buildOptionCard(talent, 'talent', 'checkbox');
    input.checked = state.talents.has(talent.key);
    input.addEventListener('change', () => {
      if (input.checked) {
        state.talents.add(talent.key);
        if (calculateSpent() > state.totalPoints) {
          state.talents.delete(talent.key);
          input.checked = false;
          showFeedback('天命点不足，无法选择该天赋。');
        }
      } else {
        state.talents.delete(talent.key);
      }
      updatePointsDisplay();
    });
    dom.talentContainer.appendChild(label);
  });
}

function renderGeneralOptions(container, options, stateSet, type) {
  container.innerHTML = '';
  options.forEach((option) => {
    const { label, input } = buildOptionCard(option, type, 'checkbox');
    input.checked = stateSet.has(option.key);
    input.addEventListener('change', () => {
      if (input.checked) {
        stateSet.add(option.key);
        if (calculateSpent() > state.totalPoints) {
          stateSet.delete(option.key);
          input.checked = false;
          showFeedback('天命点不足，无法选择该选项。');
        }
      } else {
        stateSet.delete(option.key);
      }
      updatePointsDisplay();
    });
    container.appendChild(label);
  });
}

function renderLocationOptions(identity) {
  dom.locationSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = identity ? '请选择出生地' : '请先选择身份';
  placeholder.disabled = true;
  if (!state.locationKey) {
    placeholder.selected = true;
  }
  dom.locationSelect.appendChild(placeholder);

  if (!identity) {
    dom.locationCustomWrap.classList.add('hidden');
    dom.locationCustomInput.value = '';
    return;
  }

  identity.locations.forEach((loc) => {
    const option = document.createElement('option');
    option.value = loc;
    option.textContent = loc;
    dom.locationSelect.appendChild(option);
  });

  const custom = document.createElement('option');
  custom.value = 'custom';
  custom.textContent = '自定义地点';
  dom.locationSelect.appendChild(custom);

  if (state.locationKey === 'custom') {
    dom.locationSelect.value = 'custom';
    dom.locationCustomWrap.classList.remove('hidden');
    dom.locationCustomInput.value = state.custom.location;
  } else if (identity.locations.includes(state.locationKey)) {
    dom.locationSelect.value = state.locationKey;
    dom.locationCustomWrap.classList.add('hidden');
    dom.locationCustomInput.value = '';
  } else {
    dom.locationSelect.value = '';
    dom.locationCustomWrap.classList.add('hidden');
    dom.locationCustomInput.value = '';
  }
}

function toggleCustomGender(show) {
  dom.genderCustomWrap.classList.toggle('hidden', !show);
  if (!show) {
    state.custom.gender = '';
    dom.genderCustomInput.value = '';
  }
}

function rollDestinyPoints() {
  const base = 24;
  const rolls = Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1);
  const total = base + rolls.reduce((sum, value) => sum + value, 0);
  state.totalPoints = total;
  state.lastRoll = rolls;
  dom.rollDetail.textContent = `基础 ${base} 点 + 骰值 ${rolls.join(' + ')} = ${total} 点`;
  updatePointsDisplay();
  showFeedback(`掷骰成功，获得 ${total} 点天命！`, 'success');
}

function calculateSpent() {
  let spent = 0;
  const race = currentRace();
  if (race && state.identityKey) {
    const identity = findByKey(race.identities, state.identityKey);
    if (identity) {
      spent += identity.cost;
    }
  }

  if (race) {
    state.talents.forEach((key) => {
      const talent = findByKey(race.talents, key);
      if (talent) {
        spent += talent.cost;
      }
    });
  }

  state.spells.forEach((key) => {
    const spell = findByKey(DATA.spells, key);
    if (spell) {
      spent += spell.cost;
    }
  });

  state.flaws.forEach((key) => {
    const flaw = findByKey(DATA.flaws, key);
    if (flaw) {
      spent += flaw.cost;
    }
  });

  state.equipment.forEach((key) => {
    const eq = findByKey(DATA.equipment, key);
    if (eq) {
      spent += eq.cost;
    }
  });

  state.items.forEach((key) => {
    const item = findByKey(DATA.items, key);
    if (item) {
      spent += item.cost;
    }
  });

  return spent;
}

function renderSummary() {
  const entries = [];
  const race = currentRace();

  if (race && state.identityKey) {
    const identity = findByKey(race.identities, state.identityKey);
    if (identity) {
      entries.push({ label: `身份 · ${identity.name}`, cost: identity.cost });
    }
  }

  if (race) {
    state.talents.forEach((key) => {
      const talent = findByKey(race.talents, key);
      if (talent) {
        entries.push({ label: `天赋 · ${talent.name}`, cost: talent.cost });
      }
    });
  }

  state.spells.forEach((key) => {
    const spell = findByKey(DATA.spells, key);
    if (spell) {
      entries.push({ label: `仙术 · ${spell.name}`, cost: spell.cost });
    }
  });

  state.flaws.forEach((key) => {
    const flaw = findByKey(DATA.flaws, key);
    if (flaw) {
      entries.push({ label: `缺陷 · ${flaw.name}`, cost: flaw.cost });
    }
  });

  state.equipment.forEach((key) => {
    const eq = findByKey(DATA.equipment, key);
    if (eq) {
      entries.push({ label: `装备 · ${eq.name}`, cost: eq.cost });
    }
  });

  state.items.forEach((key) => {
    const item = findByKey(DATA.items, key);
    if (item) {
      entries.push({ label: `物品 · ${item.name}`, cost: item.cost });
    }
  });

  dom.summaryList.innerHTML = '';
  if (entries.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'summary__empty';
    empty.textContent = '尚未选择消耗天命点的项目。';
    dom.summaryList.appendChild(empty);
    return;
  }

  entries.forEach((entry) => {
    const item = document.createElement('li');
    item.className = 'summary__item';
    const name = document.createElement('span');
    name.textContent = entry.label;
    const cost = document.createElement('span');
    cost.textContent = `${entry.cost} 点`;
    item.append(name, cost);
    dom.summaryList.appendChild(item);
  });
}

function updatePointsDisplay() {
  state.spent = calculateSpent();
  const remaining = state.totalPoints - state.spent;
  dom.pointsTotal.textContent = String(state.totalPoints);
  dom.pointsSpent.textContent = String(state.spent);
  dom.pointsRemaining.textContent = String(remaining);
  if (dom.pointsProgress) {
    dom.pointsProgress.max = Math.max(state.totalPoints, 1);
    dom.pointsProgress.value = Math.min(state.spent, state.totalPoints);
  }
  renderSummary();
}

function showFeedback(message, tone = 'error') {
  if (!dom.feedback) {
    return;
  }
  dom.feedback.textContent = message;
  dom.feedback.classList.add('is-visible');
  dom.feedback.style.borderColor = tone === 'success' ? 'rgba(43, 122, 88, 0.45)' : 'rgba(181, 75, 59, 0.35)';
  dom.feedback.style.color = tone === 'success' ? '#1d5a40' : '#b54b3b';
  dom.feedback.style.backgroundColor = tone === 'success' ? 'rgba(43, 122, 88, 0.12)' : 'rgba(181, 75, 59, 0.08)';
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    dom.feedback.classList.remove('is-visible');
  }, 2600);
}

function getGenderLabel() {
  if (state.genderKey === 'custom') {
    return state.custom.gender || '未名之性';
  }
  const gender = DATA.genders.find((item) => item.key === state.genderKey);
  return gender ? gender.label : '不详';
}

function getEraLabel() {
  if (state.eraKey === 'custom') {
    return state.custom.era.trim();
  }
  const era = DATA.eras.find((item) => item.id === state.eraKey);
  return era ? era.label : '';
}

function getLocationLabel() {
  if (state.locationKey === 'custom') {
    return state.custom.location.trim();
  }
  return state.locationKey || '';
}

function getAppearanceLabel() {
  if (state.appearanceId === 'custom') {
    return state.custom.appearance.trim() || '自定义外貌未填';
  }
  const appearance = DATA.appearances.find((item) => item.id === state.appearanceId);
  return appearance ? appearance.label : '未描述外貌';
}

function getSelectedListFromSet(set, source) {
  const list = [];
  set.forEach((key) => {
    const item = findByKey(source, key);
    if (item) {
      list.push(item.name);
    }
  });
  return list;
}

function generateBackground() {
  const name = (dom.nameInput.value || '').trim() || '无名旅人';
  const age = (dom.ageInput.value || '').trim();
  state.name = name;
  state.age = age;
  const gender = getGenderLabel();
  const race = currentRace();
  const identity = race ? findByKey(race.identities, state.identityKey) : null;
  const time = getEraLabel() || '未定时序';
  const location = getLocationLabel() || '未知之地';
  const appearance = getAppearanceLabel();

  const talentNames = race ? getSelectedListFromSet(state.talents, race.talents) : [];
  const spellNames = getSelectedListFromSet(state.spells, DATA.spells);
  const flawNames = getSelectedListFromSet(state.flaws, DATA.flaws);
  const equipmentNames = getSelectedListFromSet(state.equipment, DATA.equipment);
  const itemNames = getSelectedListFromSet(state.items, DATA.items);

  const lines = [];
  lines.push(`【${time} · ${location}】`);
  const identityPhrase = identity ? `${race?.name ?? ''}${identity.name}` : `${race?.name ?? '未知族裔'}的旅人`;
  const agePart = age ? `${age}岁` : '年岁未详';
  lines.push(`${name}（${gender}，${agePart}），${identityPhrase}。外貌描绘：${appearance}。`);
  lines.push(`天命点共 ${state.totalPoints} 点，已投入 ${state.spent} 点，仍余 ${state.totalPoints - state.spent} 点以备后续奇遇。`);
  if (talentNames.length > 0) {
    lines.push(`觉醒天赋：${talentNames.join('、')}。`);
  } else {
    lines.push('尚未觉醒额外天赋，等待命运唤醒潜能。');
  }
  if (spellNames.length > 0) {
    lines.push(`修习仙术：${spellNames.join('、')}。`);
  } else {
    lines.push('暂未修习仙术，需要在旅途中寻找良师。');
  }
  if (flawNames.length > 0) {
    lines.push(`宿命缺陷：${flawNames.join('、')}。`);
  } else {
    lines.push('暂未刻画明显缺陷，可考虑补足宿命的代价。');
  }
  lines.push(`随身装备：${equipmentNames.length > 0 ? equipmentNames.join('、') : '尚无主武'}。`);
  lines.push(`携行奇物：${itemNames.length > 0 ? itemNames.join('、') : '暂未携带特殊道具'}。`);
  if (identity && identity.hook) {
    lines.push(`宿命牵引：${identity.hook}`);
  }

  dom.backgroundOutput.value = lines.join('\n\n');
}

function buildStartSummary() {
  const summary = [];
  const race = currentRace();
  if (!race || !state.identityKey) {
    summary.push('尚未确定角色身份。');
  }
  if (!getEraLabel()) {
    summary.push('需要设定初始时间。');
  }
  if (!getLocationLabel()) {
    summary.push('需要设定初始地点。');
  }
  if (!dom.backgroundOutput.value.trim()) {
    summary.push('尚未生成或填写背景故事。');
  }

  const remaining = state.totalPoints - state.spent;
  if (remaining < 0) {
    summary.push('天命点分配超出上限。');
  }

  dom.startSummary.innerHTML = '';

  if (summary.length > 0) {
    const message = document.createElement('div');
    message.className = 'start-message error';
    const title = document.createElement('strong');
    title.textContent = '请完善以下内容：';
    const list = document.createElement('ul');
    list.className = 'list-inline';
    summary.forEach((text) => {
      const item = document.createElement('li');
      item.textContent = text;
      list.appendChild(item);
    });
    message.append(title, list);
    dom.startSummary.appendChild(message);
    showFeedback('仍有未完成的设定，稍作调整吧。');
    return;
  }

  const success = document.createElement('div');
  success.className = 'start-message success';
  const selectedRace = currentRace();
  const identity = selectedRace ? findByKey(selectedRace.identities, state.identityKey) : null;
  const info = [
    `身份：${identity ? identity.name : '未定义'}`,
    `时间：${getEraLabel()}`,
    `地点：${getLocationLabel()}`,
    `天命点剩余：${state.totalPoints - state.spent}`
  ];
  success.innerHTML = `<strong>天命已定，可启程！</strong>`;
  const list = document.createElement('ul');
  list.className = 'list-inline';
  info.forEach((text) => {
    const item = document.createElement('li');
    item.textContent = text;
    list.appendChild(item);
  });
  success.appendChild(list);
  dom.startSummary.appendChild(success);
  showFeedback('天命规划完成，祝旅途顺遂！', 'success');
}

function attachEventListeners() {
  dom.genderSelect.addEventListener('change', (event) => {
    state.genderKey = event.target.value;
    toggleCustomGender(state.genderKey === 'custom');
  });

  dom.genderCustomInput.addEventListener('input', (event) => {
    state.custom.gender = event.target.value.trim();
  });

  dom.appearanceCustomInput.addEventListener('input', (event) => {
    state.custom.appearance = event.target.value;
  });

  dom.raceSelect.addEventListener('change', (event) => {
    setRace(event.target.value);
  });

  dom.eraSelect.addEventListener('change', (event) => {
    const value = event.target.value;
    state.eraKey = value;
    if (value === 'custom') {
      dom.eraCustomWrap.classList.remove('hidden');
    } else {
      dom.eraCustomWrap.classList.add('hidden');
      dom.eraCustomInput.value = '';
      state.custom.era = '';
    }
  });

  dom.eraCustomInput.addEventListener('input', (event) => {
    state.custom.era = event.target.value;
    state.eraKey = 'custom';
  });

  dom.locationSelect.addEventListener('change', (event) => {
    const value = event.target.value;
    if (value === 'custom') {
      state.locationKey = 'custom';
      dom.locationCustomWrap.classList.remove('hidden');
    } else {
      state.locationKey = value;
      dom.locationCustomWrap.classList.add('hidden');
      dom.locationCustomInput.value = '';
      state.custom.location = '';
    }
  });

  dom.locationCustomInput.addEventListener('input', (event) => {
    state.custom.location = event.target.value;
    state.locationKey = 'custom';
  });

  dom.nameInput.addEventListener('input', (event) => {
    state.name = event.target.value;
  });

  dom.ageInput.addEventListener('input', (event) => {
    state.age = event.target.value;
  });

  dom.backgroundButton.addEventListener('click', generateBackground);
  dom.startButton.addEventListener('click', buildStartSummary);
  dom.rollButton.addEventListener('click', rollDestinyPoints);
}

function setRace(raceId) {
  state.raceId = raceId;
  state.identityKey = null;
  state.talents.clear();
  state.locationKey = '';
  state.custom.location = '';
  const race = currentRace();
  renderIdentityOptions(race);
  renderTalentOptions(race);
  renderLocationOptions(null);
  updatePointsDisplay();
}

function init() {
  renderGenderOptions();
  renderRaceOptions();
  renderEraOptions();
  renderAppearanceOptions();
  renderGeneralOptions(dom.spellContainer, DATA.spells, state.spells, 'spell');
  renderGeneralOptions(dom.flawContainer, DATA.flaws, state.flaws, 'flaw');
  renderGeneralOptions(dom.equipmentContainer, DATA.equipment, state.equipment, 'equipment');
  renderGeneralOptions(dom.itemContainer, DATA.items, state.items, 'item');
  attachEventListeners();

  if (DATA.races[0]) {
    dom.raceSelect.value = DATA.races[0].id;
    setRace(DATA.races[0].id);
  }

  updatePointsDisplay();
}

init();
