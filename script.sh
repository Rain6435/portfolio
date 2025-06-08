project_dir="/home/brosi/portfolio-tailwind/src"

destination_folder="/home/brosi/portfolio-tailwind/src-all-files"

mkdir -p "$destination_folder"

find "$project_dir" -type f \
    -not -path "node_modules" \
    -not -path "vendor" \
    -not -path "venv" \
    -not -path "storage" \
    -not -path "public" \
    -not -path "bootstrap/cache" \
    -not -path "bootstrap/ssr" \
    -not -path "cache" \
    -not -path ".git" \
    -not -name ".env" \
    -not -name ".lock" \
    -not -name "*.log" \
    -exec cp {} "$destination_folder" \;

echo "All files have been copied to $destination_folder"