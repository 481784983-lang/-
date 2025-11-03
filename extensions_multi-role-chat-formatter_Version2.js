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