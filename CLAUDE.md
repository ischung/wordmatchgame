# CLAUDE.md — 워드 매치 게임

## GitHub Actions 시크릿 규칙

### 칸반 자동화 (`kanban-automation.yml`)

칸반 보드 자동화 워크플로우에 사용하는 GitHub PAT(Personal Access Token)의 시크릿 이름은 반드시 **`KANBAN_TOKEN`** 으로 생성한다.

- 필요 권한: `project` (read/write), `repo`
- 등록 위치: GitHub 저장소 → Settings → Secrets and variables → Actions → New repository secret
- 시크릿 이름: `KANBAN_TOKEN`

```yaml
# 워크플로우에서 참조 방식
env:
  GH_TOKEN: ${{ secrets.KANBAN_TOKEN }}
```
