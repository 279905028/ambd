export type ProjectData = {
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  hero: string;
  details: string[];
};

const F = (id: string) => `https://framerusercontent.com/images/${id}`;

export const projects: ProjectData[] = [
  {
    number: '01',
    slug: 'chemagic',
    title: 'Chemagic',
    category: 'Brand Identity',
    description:
      '为化学科技品牌打造的视觉系统，以分子结构与流体形态为灵感，将理性的科学语言与魔法般的想象力结合。主色调采用深邃蓝紫与荧光绿，呈现实验室中的探索氛围；标志通过抽象的化学符号传达品牌的创新精神。',
    hero: F('wnbsZs6rxE7pS1TkUY1OGxxSGHo.png'),
    details: [
      F('HZS4b7QoaV2VLxpoa46SHWQCs.png'),
      F('kJblReypaUzNSDOa4Ta0tuH6gTY.png'),
      F('ln2Y0Wd05yM8qmqnqOYOLqZfEbs.png'),
      F('iFHYTVmaBRgmu9FeuM6jRLgfOg.png'),
      F('1UggYwcQ4xttUUGZLL5ql2wZS8.png'),
    ],
  },
  {
    number: '02',
    slug: 'gaze-of-kin',
    title: 'Gaze of Kin',
    category: 'Art Direction',
    description:
      '一个关于亲情与凝视的艺术影像项目。借助柔和的胶片质感和近距离构图，捕捉家庭成员之间无声的情感连接。版式设计以留白为主，文字克制简洁，让画面成为叙事主角，引导观者在静默中体会血缘的温度。',
    hero: F('i49jaoILn9pAo0q2fn7NNwTfmQ.png'),
    details: [
      F('m9hVUcETPc55Uu8WSjnrdZ2Cx1Q.png'),
      F('9zAGvVfVWwGVbWonoxKmot6JDl0.png'),
      F('YOBLKXlN8nalQMCktUnW9HvORbs.png'),
      F('9MnY80bpkDdBc28Gouhe7sxdjR0.png'),
      F('HKMapgZKACLv9iDMtZteZ5B7w.png'),
      F('o4Uz6sVp7z5UeEH1YNbJZhxV5w.png'),
      F('IMJyGBHFwJ3palL028hk9YM.png'),
      F('7YRzPVKwfjF8TSZVt66NnMnhjdo.png'),
    ],
  },
  {
    number: '03',
    slug: 'situchem-ningbo',
    title: 'SituChem',
    category: 'Brand System',
    description:
      '宁波的信拓化工企业形象设计，提取分子键合的几何线条作为图形母题，构建一套兼具工业感与未来感的标识系统。深绿配米白的色彩组合传递可持续发展理念，应用于包装、空间标识与数字平台，形成统一的品牌触点。',
    hero: F('E5L9TE0bVDKyB7tz2AcfRrIrhM.png'),
    details: [
      F('b8OilLlE4OLpqrBS1ZhNxbDMc.png'),
      F('WrPMZwpRJKRSqTPxSMma6XdeJA.png'),
      F('wuZiv0OHwEdDlxalqL0OqynaIg.png'),
      F('6n6DONKZ6qbN2oM8QAX1X5MxXhU.png'),
      F('cpgZWba3cypgRi8S84WgXqoswg.png'),
      F('bpLeiStUl8e9TkecFPq3YF44Zwo.png'),
    ],
  },
  {
    number: '04',
    slug: 'junida-fiber-tech',
    title: 'Junida Fiber Tech',
    category: 'Brand System',
    description:
      '骏亿达纺织科技的品牌升级项目，灵感来自纤维的编织肌理。标志以连续线条交织成稳固结构，象征材料的强韧与可塑。视觉系统延展出细腻的图案纹理，应用于产品包装与展会物料，凸显科技材料的质感美学。',
    hero: F('MVgXMsIOWFFt6XoLy4Kx0AxnLJc.png'),
    details: [
      F('qbxoBJZuja7GGyeLJqopFPEiUpc.jpg'),
      F('MkjqQXH0rbg2mVQQVRGzlXbh4E.jpg'),
      F('YUk9hrhIR644FgOrW9GOAzhwTM.png'),
      F('pGwVDEMoch7ajPWImr8bswf4Q.jpg'),
      F('vcE2OPdwJDQe9Cf5ED7W2Eb5buk.png'),
      F('XJXxKVm7qKuC4uahD1MgaBa8Zk.png'),
      F('juhsHcPwPTSJvoEP3gaqtv1PC0.png'),
      F('DYVLjDwzhzQfPIQRVr1OqAkTEE.png'),
    ],
  },
  {
    number: '05',
    slug: 'chemintech',
    title: 'CheminTech',
    category: 'Identity',
    description:
      '化学科技公司的极简识别设计。标志以抽象六边形构筑分子骨架，形态精炼克制。配以中性灰阶配色与现代无衬线字体，营造出专业、可靠的科技氛围，适用于报告、名片与官网等多重场景。',
    hero: F('QKeRatRIl9lDjh5Je0ZjAv4xyE4.png'),
    details: [
      F('XWcZT2iPQOdrlU6JzU1p01dyMQ.png'),
      F('eCZ9SsomNTNavKlqpdKZUD2NNq4.png'),
      F('hNQtFO60HFRMotTXB12OaJ3BRI.png'),
    ],
  },
  {
    number: '06',
    slug: 'innee-gallery',
    title: 'INNEE Gallery',
    category: 'Editorial',
    description:
      'INNEE 当代艺术画廊的视觉系统设计。标志取自展览空间的平面切片，富有建筑感。动态海报与展览导视融合实验性排版，呼应画廊先锋的策展态度，让品牌本身也成为一件值得欣赏的视觉作品。',
    hero: F('cYBYpYihYSbHjIuT42qKwakt16U.gif'),
    details: [
      F('6dgjAZIr5Ky7VokCosLn78gvJc.png'),
      F('04M06zps4cUFuzrMOVQxt6fgqYI.png'),
      F('PLOBxRTkdpBgBsCndFQ4HgFqs.png'),
      F('VdsBiVsMRuk9EeB6AydSFlCFo.png'),
      F('3Xb8QXHjHCjnDQubTYBY5HrydI.png'),
      F('JjcYx4pNhfblwuVvcHZ0pqsg.png'),
      F('w86pOY2hEIZSJhKrwfydJDZuYE.png'),
      F('09G67V5kvFF6h9p1YPiz4sbaoD4.png'),
    ],
  },
  {
    number: '07',
    slug: 'wtattoo',
    title: 'W-Tattoo',
    category: 'Brand Identity',
    description:
      'W-Tattoo 纹身工作室的品牌形象设计。视觉语言融合手绘线条与暗黑哥特元素，营造独特的亚文化氛围。动态标志、宣传海报与社交媒体物料形成强烈识别，传达自由、叛逆与艺术性并存的品牌态度。',
    hero: F('Jj6Kw0cq0caFNSyIT2nB8YofVm0.gif'),
    details: [
      F('JiHSuFYs82OgnhMsirOQDiAnoM.gif'),
      F('b4B4mPhVIb6JowjMy4OyU60D54o.jpg'),
      F('eTIHWNqAUzhW0bdewmwMStBnAp0.jpg'),
      F('4zrYtZaGlrX7Nsxc72coyYeY.jpg'),
      F('BGL8mgjW19KBgg3D6NYfqeoSI.jpg'),
      F('w1LisNoT19jw9lZvT0eYUN9ITws.jpg'),
      F('wDwWrMNnjzuLdPD5qmKz5fMg48.jpg'),
      F('fkTgWxMiXxyKvZ4drFnBd5TkI.gif'),
    ],
  },
  {
    number: '08',
    slug: 'dayoff',
    title: 'DayOff',
    category: 'Packaging',
    description:
      'DayOff 是一个倡导慢生活的生活方式品牌。视觉系统以柔和的莫兰迪色调和手作感插画为主，传达放松、闲适的情绪。包装与海报采用大面积留白和温润字体，鼓励人们在繁忙日常中找到片刻喘息。',
    hero: F('iOoLAoHfTQEI36nNiedHIGScMQ.gif'),
    details: [
      F('CFjABUaeIbxnxcdTuuitwol54.jpg'),
      F('cEVPSYeUgYdj1sr0v8gAlesFY0.jpg'),
      F('dBxQAq4nwshioz2JFbMjSEpmhMU.jpg'),
      F('DOGrurSxKZ1eaLQYioq9bDV1Ak.jpg'),
      F('3CII6pTzm2IrdMZZe7fCGUGKl8.jpg'),
      F('Cm15KyDwp2lSHU4waxQZIweJPIU.jpg'),
      F('e5Ha3c4D3C6UcZfdFteYrdoEmuk.jpg'),
      F('NStj6ierT7ngYeBjvHvStRqlhs.jpg'),
    ],
  },
  {
    number: '09',
    slug: 'owork',
    title: 'Owork Office',
    category: 'Spatial',
    description:
      'Owork 联合办公空间的品牌形象设计。标志以圆角几何模块组合，象征灵活协作与多元社群。鲜明的橙色与中性灰构筑年轻而专业的气质，导视系统与空间应用一体化，让办公成为愉悦的体验。',
    hero: F('3WrOYkoXNiQlerjCMbCcCmFVAIQ.gif'),
    details: [
      F('FKB91sXaAMpQFKGR80Yqx97yk.jpg'),
      F('pkeOexpLBdqWqWmyXivotzp7y0.jpg'),
      F('hDqS2b84zBhGfYN6mY319WqH5w.jpg'),
      F('acrx45QMt5HmAAiXy36wMVtG0k.jpg'),
      F('d6TJIthw7VzBeVGk8V0ODrVno08.jpg'),
      F('GaBRkj2CdFoxHVfeDo0akM4yRI.jpg'),
      F('QntEd2wBFxxsBB1coVyucUqc.jpg'),
      F('EmlebPXDtorSvoYogxLwLnvxyg.jpg'),
    ],
  },
  {
    number: '10',
    slug: 'miaoyin',
    title: 'Miaoyin Temple',
    category: 'Editorial',
    description:
      '妙音寺的文化品牌项目，致力于让传统佛教美学走进当代生活。视觉以金墨双色为基调，提炼经文笔触与莲纹元素，构建宁静而庄严的氛围。海报、礼盒与文创衍生品形成系列，传递东方禅意与人文关怀。',
    hero: F('l0a1pr7j7vfj7rntm4E9GznzM.jpg'),
    details: [
      F('TaeSy5Nn1vOBb49ZsrZy2beXsg.jpg'),
      F('024rgaxCpQoPwxCxhrof1n9tCQ.jpg'),
      F('frFLShAjJRaNEpWZlxepFwEICo.jpg'),
      F('MbTOBdUzlmqXlA8WlfvcBp3l1w.jpg'),
      F('sZGOenvh5vvHAxckrHXAr6qooo.jpg'),
      F('ToRS3nKZxOMTcmz86hJ94wIBwiw.jpg'),
      F('xoENWr2JwCbZdFzsm4AgQPCZrOc.jpg'),
      F('Zs4NgNKJLQzLoYHAkQv3iniFYg.jpg'),
    ],
  },
  {
    number: '11',
    slug: 'ayerwo',
    title: 'Ayerwo Nursery',
    category: 'Brand Identity',
    description:
      'Ayerwo 婴幼儿托育中心的品牌形象。视觉以柔软的圆形和手绘元素构筑安全感，主色采用粉橘与奶白的暖色组合。标志亲切活泼，导视与教具系统贯穿空间，让孩子和家长都感受到温暖与信任。',
    hero: F('49HArvuAVKLVgqeQWAtXBVYjbiw.jpg'),
    details: [
      F('gJRGic7v3oSnQ1OgSIGTm3LjQw.jpg'),
      F('wjX4ZiOMOfPATsLNAreaH62pHDU.jpg'),
      F('g9qy83kXQmZAkjIf5ragLube08Q.jpg'),
      F('Bg6HUJNIwEU8A0pdQyqH7f7rKs.jpg'),
      F('b7TFhE7E6SkRkEyptfH0BUp00zM.jpg'),
      F('BMyIM3szbFRKvPb7wEAkG1Mj30.jpg'),
      F('nvsFjytaKUxHduUJxHPZeAGhkPk.jpg'),
      F('ENyfO9Tre9SpT53COknWYVFwdI.jpg'),
    ],
  },
  {
    number: '12',
    slug: 'yiwen',
    title: 'Yiwen School',
    category: 'Brand System',
    description:
      '艺文学校的品牌系统设计。以字形笔画与书页结构为视觉切入，构建一套兼具学术气质与现代感的识别。深绿与象牙白搭配，应用于校刊、招生物料与校园导视，传达对人文教育的坚定信念。',
    hero: F('GiCO3PQesoKMi0IW5gkDK1Lvg8.jpg'),
    details: [
      F('7NnfoAbTqlntKr06tGKVYhimbE.jpg'),
      F('8kTS1iq2QO1nJK2wN3CyD0F0.jpg'),
      F('PDAb7Vgcpzj3Y3GUFom8dYMpiZ0.jpg'),
      F('gRsymODx2iztc51jqaVcMXViCz4.jpg'),
      F('LQmZGKd36CnfhwhVX1e2OI0cPU.jpg'),
      F('CCCYpQ400rTHW4fFoDkdhOD57qk.jpg'),
      F('70MkUTxInuj2ndLYCa3sB6oLC4s.jpg'),
      F('QtvEKdj1u6h4pihlD07dT9v72o.jpg'),
    ],
  },
  {
    number: '13',
    slug: 'mashe',
    title: 'Mashe',
    category: 'Brand Identity',
    description:
      'Mashe 当代设计品牌的视觉系统。以极简几何与去装饰化原则贯穿始终，标志结构清晰、留白有度。黑白主色配合精准的网格排版，应用于产品标签、画册与电商页面，呈现冷静理性的品牌气质。',
    hero: F('pBwICclI107HObp4DGAgubac.jpg'),
    details: [
      F('vQvjMSQSs7Mjb09xHlyN4wdp2xs.jpg'),
      F('dhHQX9T2ROh1cfW89xzf4JwA5M.jpg'),
      F('2RZfnHJdRob94twLpVGM3NhtY.jpg'),
      F('k0l5QDaMmFLQijvX4tysSAiLgkA.jpg'),
      F('gSEkB7kWsPfe3vVxZemnLE8s1Q.jpg'),
      F('Jja6uvRU4KiVrCNnUjHNFfQdXk.jpg'),
      F('1l4LHxFtVu1KRzAQFmOxQXH7WY.jpg'),
      F('qZe0Fnp2i9LXEvylT8ku3w7PIiU.jpg'),
    ],
  },
  {
    number: '14',
    slug: 'cello-sonata',
    title: 'Cello Sonata',
    category: 'Editorial',
    description:
      '大提琴奏鸣曲音乐会的视觉企划。海报借助流动的笔触与深沉的暗色调，呼应大提琴低沉而富有张力的声线。动态视觉与节目册延展同一情绪，让平面设计成为听觉体验的视觉延伸。',
    hero: F('yvTFw9W36TA9AF3AfXYE4topGBE.jpg'),
    details: [
      F('qrxRmssJYkXqmA8UzgJe4dRF0M.gif'),
      F('B8CvL0T10P6hShXltWYLZLAsKo.jpg'),
      F('PReAbDOJFTwrDrtlRSx3HaPKVsw.jpg'),
      F('fa2z8rlEj28zHEUkL66Fd8CqDE.jpg'),
      F('qMcuit1SJqAX9TQIlb34U46Ejlg.jpg'),
      F('wKofuFtefw1B450eGH8yDjxlps.jpg'),
      F('XhdI1yMEmdgcnFXtkzEE56ZU.jpg'),
    ],
  },
  {
    number: '15',
    slug: 'tsingshan',
    title: 'Tsingshan',
    category: 'Spatial',
    description:
      '青山品牌的钢管展厅设计。以山峦轮廓为图形原点，配以品牌色墨绿与原木色调，传达对自然与可持续的承诺。',
    hero: F('L2Met8qhNrSJazR31OXtokGos.jpg'),
    details: [
      F('BMyIM3szbFRKvPb7wEAkG1Mj30.jpg'),
      F('g9qy83kXQmZAkjIf5ragLube08Q.jpg'),
    ],
  },
  {
    number: '16',
    slug: 'inwest',
    title: 'Inwest Group',
    category: 'Brand Identity',
    description:
      'Inwest 投资集团的企业形象设计。标志以稳固的几何字形构筑权威感，深蓝配金色传达专业、信任与价值。完整的视觉系统涵盖年报、名片与办公空间应用，塑造一个面向未来的现代金融品牌形象。',
    hero: F('KgKB7Bus8MeySkk2Kv3M5GzI.png'),
    details: [
      F('8wyIPpuw37MEjsaS0WHLV385BZ0.png'),
      F('XYL78GB5v1iWJfJ4woqlTyGlbQQ.jpg'),
      F('2gXPRvVrzglHyI16dLzoKMUUIo.jpg'),
      F('OTV4E3RZcvOKMBiwJ0fUftOYC0.jpg'),
      F('C222QyiFTlAPdTLnJknZ6uic0ys.jpg'),
      F('NOev97ZZ6wXiGuONXULLf3yKHXM.jpg'),
      F('ujUF8DcxRMYCPeHFXRSEMcXaHA.jpg'),
    ],
  },
  {
    number: '17',
    slug: 'hiplus',
    title: 'Hiplus Furniture',
    category: 'Brand System',
    description:
      'Hiplus 家具品牌的视觉系统设计。以家具的结构线条为图形灵感，标志简洁而富有工艺感。视觉应用强调材质与生活场景的真实呈现，画册、网站与展厅形象统一，传达品牌对品质生活的理解。',
    hero: F('WfyQKvxi7QKEIA7VRbQcueQ3A.gif'),
    details: [
      F('Guky0EFseu4cxvfIL4eQtgRuUQM.jpg'),
      F('HZ9vcI81bICwTOBk01k7SyKYFk.jpg'),
      F('hcQOLp1QktOLTb7cBBosvB7HxFk.jpg'),
      F('G9fGXswNi0slPWGJoiSrOrpw.jpg'),
      F('HUya4BEp5788cSwkI7xm25yQRU.jpg'),
      F('XdEDdGe79Imokx6I7wefH0qIY6g.jpg'),
    ],
  },
  {
    number: '18',
    slug: 'hello-food',
    title: 'Hello Food',
    category: 'Packaging',
    description:
      'Hello Food 餐饮品牌的视觉形象。标志以友好的手写字体配合食材图形，营造亲切热情的就餐氛围。明亮的红黄主色与活泼版式应用于菜单、外卖包装和门店导视，让品牌从街头便能被一眼识别。',
    hero: F('PMAVkHlwoSzG1BUXICk9IXFGno.jpg'),
    details: [
      F('QYVi8sWjlyrwNDOg7dguyEglo.jpg'),
      F('FAJHJfTiRRRwaB5DSehOQnKo8.jpg'),
      F('9LlYRAnnLe1eQGeAcIB3OaB7OGE.jpg'),
      F('T94FkAQC5Gx8dCzOfnRaXJUgwwc.jpg'),
      F('PYkloNDH5N2wYtDUWcuMOTaNk4.jpg'),
    ],
  },
  {
    number: '19',
    slug: 'wenzhou-overseas',
    title: 'Wenzhou Overseas',
    category: 'Identity',
    description:
      '温州海外华侨商会的 LOGO 设计。结合温州本土纹样与航海图形元素，构建一套具有叙事性的视觉系统。米白与海蓝的色彩组合呼应漂洋过海的故事感，应用于展览、画册与文创产品。',
    hero: F('H5qnbgr2Rvtu3ycNh9zQjgmt90.jpg'),
    details: [
      F('ug5MZfkEkp0YjW3xOgjKdfW67E.jpg'),
      F('nrHRjFQooVv6pPMvLfeAfLT9yE.jpg'),
      F('TZWMx36k5e9x7UHIkPdmnvGVg.jpg'),
      F('Mq1ngbaXeIx2EdfF7yix6mZnF5I.jpg'),
    ],
  },
];
