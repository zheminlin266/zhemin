import Image from "next/image";
import Link from "next/link";
import SiteControls from "./site-controls";
import { homeCopy, homePath } from "../content/registry.mjs";
import { momentPath } from "../content/moments.mjs";

export default function MomentAlbum({ collection, language }) {
  const copy = homeCopy[language];
  const otherLanguage = language === "cn" ? "en" : "cn";

  return (
    <div>
      <SiteControls
        language={language}
        alternateHref={momentPath(collection.slug, otherLanguage)}
        labels={{ settings: copy.settings, switchLabel: copy.switchLabel, themeDark: copy.themeDark, themeLight: copy.themeLight }}
      />
      <main className="moment-album" lang={language === "cn" ? "zh-CN" : "en"}>
        <header className="moment-album-header">
          <Link className="article-back" href={homePath(language)}>← {language === "cn" ? "返回首页" : "Back home"}</Link>
          <h1>{collection.label[language]}</h1>
        </header>
        {collection.photos.map((photo, index) => {
          const landscape = photo.width > photo.height;
          return (
            <figure className="moment-figure" id={photo.id} key={photo.id}>
              <div
                className="moment-image-frame"
                tabIndex={landscape ? 0 : undefined}
                role={landscape ? "region" : undefined}
                aria-label={landscape ? (language === "cn" ? "宽幅照片；桌面窄窗口可横向滚动" : "Wide photo; scroll horizontally on narrow desktop windows") : undefined}
              >
                <div
                  className={landscape ? "moment-rotate-mobile" : undefined}
                  style={landscape ? { "--photo-ratio": photo.width / photo.height, "--rotated-ratio": `${photo.height} / ${photo.width}` } : undefined}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt[language]}
                    width={photo.width}
                    height={photo.height}
                    unoptimized
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
              <figcaption>{index + 1} / {collection.photos.length}</figcaption>
            </figure>
          );
        })}
        <Link className="article-back" href={homePath(language)}>← {language === "cn" ? "返回首页" : "Back home"}</Link>
      </main>
    </div>
  );
}
