# 后续配置参数记录

## GitHub Actions 配置参数

### 1. GitHub Secrets 需要配置
在你的 GitHub 仓库 Settings → Secrets and variables → Actions 中配置：

**Keep 相关（如果你使用 Keep）：**
- `KEEP_MOBILE`: 你的 Keep 手机号（如：15898145017）
- `KEEP_PASSWORD`: 你的 Keep 密码

**其他运动应用（根据需要使用）：**
- `NIKE_REFRESH_TOKEN`: Nike Run Club 的 refresh token
- `STRAVA_CLIENT_ID`: Strava API 的 Client ID
- `STRAVA_CLIENT_SECRET`: Strava API 的 Client Secret
- `STRAVA_CLIENT_REFRESH_TOKEN`: Strava API 的 refresh token
- `GARMIN_SECRET_STRING`: Garmin 国际版的 secret string
- `GARMIN_SECRET_STRING_CN`: Garmin 中国版的 secret string
- `COROS_ACCOUNT`: Coros 账号
- `COROS_PASSWORD`: Coros 密码

### 2. GitHub Actions 配置文件修改
修改 `.github/workflows/run_data_sync.yml` 中的以下参数：

**第29行**：设置 `RUN_TYPE` 为你的运动应用类型
```yaml
RUN_TYPE: keep  # 可选值: strava, nike, garmin, garmin_cn, coros, keep, 等
```

**第30-31行**：修改个人信息
```yaml
ATHLETE: 你的名字
TITLE: 你的跑步页面标题
```

**第32-33行**：修改距离筛选
```yaml
MIN_GRID_DISTANCE: 10  # 网格图中显示的最小距离（公里）
TITLE_GRID: Over 10km Runs  # 网格图标题
```

**第41行**：数据存储选项
```yaml
SAVE_DATA_IN_GITHUB_CACHE: false  # 如果设为 true，数据会保存在 GitHub Cache 中，保持仓库干净
```

### 3. 前端个性化配置
修改 `src/static/site-metadata.ts` 中的网站信息：
```typescript
siteMetadata: {
  siteTitle: '你的跑步主页标题',
  siteUrl: 'https://你的域名',
  logo: '你的 Logo URL',
  description: '个人跑步数据展示',
  navLinks: [
    {
      name: '博客',
      url: 'https://你的博客链接',
    },
    {
      name: '关于',
      url: 'https://github.com/你的用户名/running_page',
    },
  ],
},
```

修改 `src/utils/const.ts` 中的地图和样式配置：
```typescript
// 地图配置
const MAP_TILE_VENDOR = 'mapcn'; // 默认免费地图
const MAP_TILE_STYLE = 'osm-bright';
const MAP_TILE_ACCESS_TOKEN = ''; // MapCN 不需要 token

// 样式配置
const USE_DASH_LINE = true; // 是否使用虚线
const LINE_OPACITY = 0.4; // 线条透明度
const PRIVACY_MODE = false; // 隐私模式（不显示地图仅显示轨迹）
const LIGHTS_ON = true; // 默认开灯模式
const SHOW_ELEVATION_GAIN = false; // 是否显示海拔增益列
```

## 已完成的修改

### 1. keep_sync.py 错误处理
已修改 `run_page/keep_sync.py` 中的 `login()` 函数，添加了错误处理：
```python
def login(session, mobile, password):
    # ... 原有代码 ...
    if r.ok:
        token = r.json()["data"]["token"]
        headers["Authorization"] = f"Bearer {token}"
        return session, headers
    else:
        print(f"Login failed with status code: {r.status_code}")
        print(f"Response: {r.text}")
        return None
```

### 2. 代码已推送到远程仓库
代码已成功推送到：`https://github.com/hation/running_page`

## 后续步骤

1. **配置 GitHub Secrets**：根据你使用的运动应用配置相应的 API keys
2. **修改个人信息**：更新 `run_data_sync.yml` 和 `site-metadata.ts` 中的个人信息
3. **测试运行**：在 GitHub Actions 中手动运行一次 "Run Data Sync"
4. **部署网站**：配置 Vercel 或 GitHub Pages 来部署你的跑步主页

## 注意事项

1. **安全提醒**：不要在代码中硬编码密码或敏感信息
2. **API 限制**：注意各运动应用的 API 调用限制
3. **数据备份**：定期备份 `data.db` 和 `activities.json` 文件
4. **隐私保护**：如果使用公共仓库，考虑启用隐私模式或使用私有仓库

## 测试过的功能

- ✓ Keep 数据同步（使用手机号：15898145017）
- ✓ GPX 和 TCX 文件生成
- ✓ 错误处理改进
- ✓ 代码提交和推送

## 待测试功能

- GitHub Actions 自动同步
- 网站部署
- 其他运动应用同步