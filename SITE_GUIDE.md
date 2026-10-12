# 本站的预览、发布和内容编辑

这个仓库使用 Jekyll 生成网站，常用页面已切换到自有的轻量布局。当前 Git 远端是
`ethan-yucheng-pan/homepage`，默认分支为 `master`。
按默认 GitHub Pages 地址，站点应位于
`https://ethan-yucheng-pan.github.io/homepage/`。
如果 GitHub Pages 使用了自定义域名，请以仓库 **Settings → Pages** 中显示的地址为准，并相应调整 `_config.yml` 的 `url` 和 `baseurl`。

## 在 Mac 本地预览

1. 打开终端并进入本仓库。如果还没有克隆，先运行：

   ```bash
   git clone https://github.com/ethan-yucheng-pan/homepage.git
   cd homepage
   ```

2. 安装 Ruby。macOS 自带的 Ruby 往往版本较旧；这个仓库的 Dockerfile 使用 Ruby 3.2，本地也建议使用同一版本：

   ```bash
   brew install ruby@3.2
   export PATH="$(brew --prefix ruby@3.2)/bin:$PATH"
   ruby --version
   ```

   若 `bundle --version` 提示找不到命令，再运行 `gem install bundler`。以后新开终端时也需要让 Homebrew Ruby 出现在 `PATH` 中；可将上面的 `export PATH=...` 行加入 `~/.zshrc`。

3. 在仓库目录安装依赖并启动预览：

   ```bash
   bundle config set --local path vendor/bundle
   bundle install
   bundle exec jekyll serve --config _config.yml,_config_local.yml --host 127.0.0.1
   ```

4. 浏览器打开 [http://127.0.0.1:4000/](http://127.0.0.1:4000/)。修改 Markdown 或样式文件后，Jekyll 会重新生成页面；刷新浏览器查看。修改 `_config.yml` 或 `_config_local.yml` 后，要停止并重启预览命令。

`_config_local.yml` 只覆盖本地预览地址，使本地链接指向 `127.0.0.1:4000`；线上仍使用 `_config.yml`。`vendor/`、`.bundle/` 和生成的 `_site/` 已被 Git 忽略。

## 在 GitHub 上发布与检查

1. 打开[这个仓库的 Pages 设置](https://github.com/ethan-yucheng-pan/homepage/settings/pages)。在 **Build and deployment** 中选 **Deploy from a branch**，分支选 `master`，目录选 `/(root)`，然后保存。此仓库没有自己的 Pages workflow，因此这是与现有结构匹配的发布方式。
2. 本地修改并预览后，检查 `git diff`，然后提交并推送到 `master`。如果希望先在 GitHub 上审阅，可以先推送到新分支，确认后再合并到 `master`。
3. 在 **Actions** 查看构建结果，并在 **Settings → Pages** 打开 GitHub 显示的站点地址。GitHub 的发布设置当前无法从本地仓库确认，因此首次使用时请在该页面核对。

直接在 GitHub 网页上编辑文件并提交到发布分支，也会触发重新构建，但不方便先看本地效果。

## 地址配置

仓库名、Git 远端和 `_config.yml` 当前已统一使用 `homepage`：

```yaml
url: "https://ethan-yucheng-pan.github.io"
baseurl: "/homepage"
repository: "ethan-yucheng-pan/homepage"
```

`_config_local.yml` 的 `baseurl` 继续留空，本地从网站根路径预览。发布前应在 GitHub **Settings → Pages** 核对线上地址。旧项目站点地址不会自动跳转到新地址；已有的外部链接需要更新。

参考：[GitHub Pages 的项目地址规则](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、[仓库改名说明](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository)。

## 本地预览常见问题

自有布局使用内嵌 SVG 图标，常用页面不再依赖图标字体。资源链接带站点前缀、跟随当前主机地址，本地可使用 `localhost` 或 `127.0.0.1`。

如果出现 `bundler: command not found: jekyll`，先运行 `ruby --version`。已安装的依赖使用 Ruby 3.2；若当前终端用了 Ruby 4，先执行 `export PATH="$(brew --prefix ruby@3.2)/bin:$PATH"` 再运行预览命令。

WEBrick 的 `Errno::ECONNRESET: Connection reset by peer` 表示客户端连接在服务器读取时被关闭。单凭这段堆栈不能确定客户端为何关闭连接，刷新或取消请求都可能造成这种情况。如果页面仍能打开，它不等于 Jekyll 构建失败；应以构建是否完成、页面与资源是否成功响应来判断。

## 改内容时看哪里

| 想修改的内容 | 文件 |
| --- | --- |
| 首页介绍、研究兴趣、简历入口文字 | `_pages/about.md` |
| News 条目 | `_data/news.yml` |
| Selected Publications 条目 | `_data/selected_publications.yml` |
| 首页合作经历的姓名、机构、链接和说明 | `_data/collaborators.yml` |
| 侧边栏头像、英文名、中文名、简介、邮箱和账号，以及全站标题、描述 | `_config.yml`；中文名字段为 `author.name_zh`，当前头像图片在 `images/avatar.jpg` |
| 侧边栏显示哪些链接及其顺序 | `_data/profile_links.yml`；账号值仍取自 `_config.yml` |
| 顶部导航的显示、顺序和链接 | `_data/navigation.yml` |
| 论文列表和每篇论文的正文 | `_publications/` 中各篇 Markdown |
| 报告列表和每场报告的正文 | `_talks/` 中各篇 Markdown |
| Teaching 页的课程、角色、学期和机构摘要 | `_data/teaching.yml` |
| 简历 PDF | `assets/cv.pdf` |
| 报告幻灯片及其他下载文件 | `files/` |

新增论文或报告时，可复制同目录现有的 `.md` 文件，修改顶部 `---` 之间的标题、日期、链接等字段及下面的正文。页面列表会从这些文件自动生成。新增合作经历时，在 `_data/collaborators.yml` 中复制一个 `people` 与 `description` 组并修改文字。一般内容更新不需要改 HTML、CSS 或布局代码。

News 与 Selected Publications 目前为空，内容文件顶部有注释示例。添加第一个条目时，删除文件末尾的 `[]`，按示例填入条目即可。条目按文件顺序显示，最新条目放在最上面。News 的 `text` 支持 Markdown；精选论文的 `paper_url` 和 `code_url` 可以使用完整网址或 `/files/...` 这样的站内路径。没有填写的可选字段不会显示。

首页的 About Me、News、Selected Publications 使用同一级标题；导航链接直接指向首页锚点。标签页标题使用 `Yucheng Pan - 页面名`，首页跳转到 News 或 Selected Publications 时也会更新。简介中以 ` @ ` 分隔的身份与机构各自保持完整，空间不够时在两个短语之间换行。

Teaching 只展示 `_data/teaching.yml` 中的课程摘要，不再生成可点击的经历详情页。`_teaching/` 内的旧记录留存，但不再用于该页面，也不再单独发布。全站的社交媒体分享按钮已通过 `_config.yml` 的 `share: false` 关闭。

## 改外观时看哪里

常用页面现在只加载一份自有样式和一份原生 JavaScript：

| 外观或交互 | 文件 |
| --- | --- |
| 页面骨架、导航、侧栏、页面标题 | `_layouts/personal.html` |
| 首页三个栏目与数据渲染 | `_layouts/home.html` |
| 侧栏资料与图标 | `_includes/personal-profile.html`、`_includes/personal-icon.html` |
| 排版、圆形头像、响应式布局、明暗颜色 | `assets/css/personal.scss` |
| 夜间模式、保存选择、锚点标签页标题 | `assets/js/personal.js` |
| 课程摘要结构 | `_includes/teaching-summary.html` |

首次访问跟随系统的明暗模式，导航右侧的按钮可以切换并保存选择。颜色集中在样式文件顶部的 CSS 变量中。

Jekyll 的内容目录、永久链接、Teaching 摘要、CV/PDF 下载、论文与报告页面、站点地图和 RSS 保留。主页、Teaching、Publications、Talks、站点地图、HTML CV 及集合详情使用自有布局；仍明确指定 `archive` 等旧布局的模板演示页继续使用原模板。原 `_sass/`、`assets/css/main.scss` 和旧 JavaScript 仍在仓库，但常用页面不再加载它们。

当前完成的是常用页面的自有实现，尚未删除旧模板文件。若要恢复原版布局，可将 `_config.yml` 的集合默认布局 `personal` 改回 `single`（talks 改回 `talk`），首页移除 `layout: home`，并将列表页的 `layout: personal` 改回 `archive`。这不需要改动正文、课程或资料文件。后续清理整个仓库时，可依据需要保留的页面逐步移除旧示例和未使用资源。

模板还留有演示内容，例如 `_pages/cv.md`、`_portfolio/` 和部分 `_posts/`。它们目前没有出现在顶部导航里，但可能仍有可直接访问的页面；之后整理内容时应逐项决定保留、替换还是删除。
