import subprocess
import sys

# Получаем изменённые файлы
result = subprocess.run(["git", "diff", "--name-only"], capture_output=True, text=True)
changed_files = result.stdout.strip().splitlines()

# Проверяем наличие изменений в .java-файлах
java_changed = any(path.strip().endswith(".java") for path in changed_files)

if java_changed:
    print("[BLOCKED] Изменены .java-файлы. Коммит запрещён.")
    sys.exit(1)
else:
    print("[OK] Нет изменений в .java-файлах. Выполняем авто-коммит.")
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", "Auto commit (без изменений в .java)"], check=True)
    subprocess.run(["git", "push"], check=True)
