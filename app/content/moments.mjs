import imageCatalog from "./moment-images.json" with { type: "json" };
import { languages } from "./registry.mjs";

const descriptions = {
  wuyishan: {
    IMG_20260912_222251: ["溪流、亭子与远处的群山", "A stream and pavilion beneath distant mountains"],
    IMG_20260912_222345: ["晚霞下的树木与水边建筑", "Trees and waterside buildings at dusk"],
    IMG_20260912_222600: ["蓝天下的中式亭阁", "A traditional pavilion beneath a blue sky"],
    IMG_20260912_222912: ["山坡上的白色雕像", "A white statue on a hillside"],
    IMG_20260912_223312: ["街道上的人群与山间建筑", "A crowd on a street among mountain buildings"],
    IMG_20260912_223446: ["蓝天下的白墙建筑与树木", "A white building and trees beneath a blue sky"],
    IMG_20260912_224545: ["山脚下的翠绿田野", "Green fields at the foot of the mountains"],
    IMG_20260913_122602: ["巷子尽头的传统建筑", "A traditional building at the end of an alley"],
    IMG_20260913_122651: ["树林环绕的绿色田野", "Green fields surrounded by wooded hills"],
    IMG_20260913_122742: ["群山间的田地和林木", "Fields and trees between the hills"],
    IMG_20260913_122849: ["蜿蜒山路上的骑行者", "A cyclist on a winding mountain road"],
    IMG_20260913_123102: ["树荫下的稻田与村舍", "Rice fields and houses beneath a leafy tree"],
    IMG_20260913_141755: ["溪边的木屋与桥", "Wooden houses and a bridge beside a stream"],
    IMG_20260913_221315: ["庭院中的红色墙面与桌椅", "Tables and chairs beside a red courtyard wall"],
    IMG_20260913_233418: ["夜晚灯光下的木质廊亭", "A warmly lit wooden veranda at night"],
    IMG_20260914_104349: ["街边的店铺与行人", "A street-side shop and a passerby"],
    IMG_20260914_104520: ["门口坐着的人与阳光照亮的墙面", "A person sitting in a doorway by a sunlit wall"],
    IMG_20260914_104705: ["山峦、田野与远处的村庄", "Mountains, fields, and a distant village"],
    IMG_20260914_104843: ["林间土路上的行人", "A person walking on a wooded dirt path"],
    IMG_20260914_105153: ["田野另一侧的村庄与山峦", "A village and mountains beyond the fields"],
    IMG_20260914_105410: ["阳光下的大片绿色田地", "An expanse of green fields in the sun"],
    IMG_20260914_105626: ["山下的田野与白色村舍", "Fields and white houses beneath the mountains"],
    IMG_20260914_105742: ["树木间升起炊烟的村庄", "Smoke rising among trees in a village"],
    IMG_20260914_105858: ["田野里的一株高草与远山", "A tall stalk of grass in a field with mountains behind"],
    IMG_20260914_123946: ["溪边的石桥与木屋", "A stone bridge and wooden houses beside a stream"],
    IMG_20260914_124206: ["树荫下溪水中的游人", "People wading in a stream beneath trees"],
    IMG_20260915_184210: ["田野、树木与远处的蓝色山峦", "Fields, trees, and blue mountains in the distance"],
    IMG_20260915_184403: ["稻田中的树与远处群山", "A tree among rice fields and distant mountains"],
    IMG_20260915_184452: ["溪流穿过山间绿色田野", "A stream winding through green fields between mountains"],
    IMG_20260916_204258: ["山坡上的一间房屋", "A lone house on a wooded hillside"],
    IMG_20260917_123407: ["山脚下的建筑与田地", "Buildings and fields at the foot of a mountain"],
    IMG_20260917_123631: ["浅色墙面上的屋檐影子", "The shadow of a roofline on a pale wall"],
    IMG_20260918_181711: ["云层下通往群山的乡间小路", "A country path leading toward mountains beneath clouds"],
    IMG_20260919_112736: ["田野边的一棵树与云朵", "A tree beside fields beneath scattered clouds"],
    IMG_20260919_113654: ["蓝天白云下连绵的绿色山脉", "Green mountain ridges beneath a blue, cloud-filled sky"],
    IMG_20260919_121819: ["通往山间的公路与路旁树木", "A road leading toward the hills, lined with trees"],
    IMG_20260919_121853: ["夕阳下通往群山的公路", "A road toward the mountains at sunset"],
    IMG_20260919_122139: ["落日映照的山坡与田地", "Hills and fields in the setting sun"],
    IMG_20260919_122242: ["暮色中的绿色田野与远山", "Green fields and distant mountains at dusk"],
    IMG_20260919_122542: ["白云下的田野与山峦", "Fields and mountains beneath white clouds"],
    IMG_20260919_122600: ["山脚下蜿蜒的小路与农田", "A winding path through farmland beneath the mountains"],
    IMG_20260919_122810: ["屋檐上方的白云与蓝天", "White clouds in a blue sky above rooftops"],
    IMG_20260919_122950: ["绿树上方的积云", "Towering clouds above green trees"],
    IMG_20260919_203902: ["暮色中通向群山的笔直小路", "A straight path toward the mountains at dusk"],
    IMG_20260919_204044: ["傍晚的石桥与远处的山峦", "A stone bridge and distant mountains in the evening"],
    IMG_20260920_135940: ["晚霞下的街道与屋檐", "A street and rooftops beneath an evening sky"],
    IMG_20260920_170305: ["窗边的街头小摊", "A street-side stall beside a window"],
  },
  wanlvhu: {
    IMG20260920094303: ["树林间碧绿色的湖水", "Turquoise lake water seen through trees"],
    IMG20260920102130: ["树荫下平静的湖面", "A calm lake beneath overhanging trees"],
    IMG_20260920_133559: ["林间望见的湖水", "A glimpse of the lake between trees"],
    IMG_20260920_133935: ["树林中沿湖蜿蜒的小路", "A winding lakeside path through the forest"],
    IMG_20260920_134107: ["树木间向上的石阶", "Stone steps climbing through the trees"],
    IMG_20260920_134153: ["湖边茂密的树林", "Dense woodland by the lake"],
    IMG_20260920_134231: ["林荫下弯曲的石径", "A curving stone path beneath leafy trees"],
    IMG_20260920_134318: ["树林阴影中的碧绿湖水", "Turquoise lake water in the shade of trees"],
    IMG_20260920_134357: ["阳光穿过树林照亮湖边小路", "Sunlight filtering through trees onto a lakeside path"],
    IMG_20260920_134502: ["阳光下的绿树与湖水", "Sunlit trees beside green lake water"],
    IMG_20260920_134552: ["树枝环绕的开阔湖面", "An open stretch of lake framed by tree branches"],
    IMG_20260920_191047: ["树荫下蓝绿色的湖面", "Blue-green lake water beneath a canopy of trees"],
  },
  "new-zealand": {
    新西兰1: ["湖边的长椅与远处的雪山", "A bench beside a lake with snow-capped mountains beyond"],
    新西兰2: ["蓝绿色的湖水与远处的雪山", "Blue-green lake water beneath distant snowy mountains"],
    新西兰徒步: ["积雪覆盖的山间徒步小径", "A snow-covered hiking trail through the mountains"],
  },
  australia: {
    IMG_8346: ["棕榈树剪影与橙红色晚霞", "Palm trees silhouetted against an orange sunset"],
    在澳洲坐热气球: ["草地上空的红色热气球", "A red hot-air balloon floating above fields"],
    在澳洲坐热气球2: ["日出时俯瞰云雾笼罩的田野", "Sunrise above mist-covered fields"],
    墨尔本旅游1: ["岩石海岸与蓝天白云", "A rocky coastline beneath a blue, cloudy sky"],
    墨尔本旅游3: ["山坡下弯曲的碧蓝海湾", "A curving turquoise bay beneath a hillside"],
    墨尔本旅游4: ["从海边山崖俯瞰海浪", "Waves viewed from a coastal cliff"],
    毕业照2: ["红色花树旁的校园建筑", "A campus building beside a tree with red flowers"],
    海岛1: ["夕阳下的海面与船只", "Boats on the sea at sunset"],
    过江坐的船: ["蓝天白云下行驶的渡船", "A ferry crossing the water beneath a blue sky"],
  },
  tibet: {
    布达拉宫: ["蓝天下的布达拉宫", "The Potala Palace beneath a blue sky"],
    梅里雪山: ["云层环绕的雪山", "Snow-capped mountains surrounded by clouds"],
    梅里雪山2: ["白云间露出的雪峰", "Snowy peaks rising through white clouds"],
    梅里雪山3: ["蓝天下连绵的雪峰", "A range of snowy peaks beneath a blue sky"],
    纳木错2: ["湖水、远山与蓝天", "A lake and distant mountains beneath a blue sky"],
    "香格里拉 背包十年青旅楼顶": ["木质露台与山景", "A wooden terrace overlooking the mountains"],
    香格里拉寺: ["蓝天下金色屋顶的寺庙建筑", "Golden-roofed temple buildings beneath a blue sky"],
    香格里拉寺和和尚: ["经幡下的寺庙广场", "A temple square beneath rows of prayer flags"],
  },
};

const labels = {
  wuyishan: { cn: "武夷山", en: "Wuyishan" },
  wanlvhu: { cn: "万绿湖", en: "Wanlvhu" },
  "new-zealand": { cn: "新西兰", en: "New Zealand" },
  australia: { cn: "澳大利亚", en: "Australia" },
  tibet: { cn: "西藏", en: "Tibet" },
};

export const moments = imageCatalog.map(({ slug, photos }) => ({
  slug,
  label: labels[slug],
  photos: photos.map((photo) => ({
    ...photo,
    alt: {
      cn: descriptions[slug][photo.name ?? photo.id]?.[0],
      en: descriptions[slug][photo.name ?? photo.id]?.[1],
    },
  })),
}));

export function momentPath(slug, language) {
  return `${languages[language].prefix}/moments/${slug}`;
}

export function getMoment(slug) {
  return moments.find((collection) => collection.slug === slug);
}

export function createMomentMetadata(collection, language) {
  const canonical = momentPath(collection.slug, language);
  const title = `${collection.label[language]} — Zhemin Lin`;
  const description = language === "cn" ? `${collection.label.cn}摄影集。` : `Photographs from ${collection.label.en}.`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { "zh-CN": momentPath(collection.slug, "cn"), en: momentPath(collection.slug, "en") },
    },
    openGraph: { type: "website", url: canonical, title, description, siteName: "Zhemin" },
  };
}
