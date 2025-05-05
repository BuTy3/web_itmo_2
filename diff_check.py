import subprocess

result = subprocess.run(["git", "diff", "--name-only"], stdout=subprocess.PIPE, text=True)
changed_files = result.stdout.strip().split("\n")

with open("params.props", "r") as f:
    tracked_paths = [line.strip() for line in f if line.strip()]

is_blocked_change = any(
    any(changed.startswith(tracked) for tracked in tracked_paths)
    for changed in changed_files if changed
)

if is_blocked_change:
    print("[WARN] Найдены изменения в отслеживаемых путях. Коммит отменён.")
    exit(1)
else:
    print("[OK] Нет изменений. Выполнение авто-коммит.")
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", "Auto commit (нет изменений в критичных файлах)"], check=True)
