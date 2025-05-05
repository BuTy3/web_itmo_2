import subprocess

# Получаем изменённые файлы
result = subprocess.run(["git", "diff", "--name-only"], stdout=subprocess.PIPE, text=True)
changed_files = result.stdout.strip().split("\n")

# Загружаем пути, за которыми нужно следить
with open("params.props", "r") as f:
    important_files = [line.strip() for line in f if line.strip()]

# Проверяем, есть ли изменения в .java
java_changed = any(f.endswith(".java") for f in changed_files if f)

if not java_changed:
    print("[OK] Нет изменений в .java-файлах. Выполняем авто-коммит.")
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", "Auto commit (без изменений в .java)"], check=True)
else:
    print("[WARN] Обнаружены изменения в .java-файлах. Коммит отменён.")
    exit(1)
