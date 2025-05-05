import subprocess

# Получаем изменённые файлы
result = subprocess.run(["git", "diff", "--name-only"], stdout=subprocess.PIPE, text=True)
changed_files = result.stdout.strip().split("\n")

# Загружаем пути, за которыми нужно следить
with open("params.props", "r") as f:
    tracked_paths = [line.strip() for line in f if line.strip()]

# Проверяем, были ли изменения в отслеживаемых путях
is_blocked_change = any(
    any(changed.startswith(tracked) for tracked in tracked_paths)
    for changed in changed_files if changed
)

if is_blocked_change:
    print("[WARN] Найдены изменения в отслеживаемых путях из params.props. Коммит отменён.")
    exit(1)
else:
    print("[OK] Нет изменений в отслеживаемых путях. Выполняем авто-коммит.")
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", "Auto commit (нет изменений в критичных файлах)"], check=True)
