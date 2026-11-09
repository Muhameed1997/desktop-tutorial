#!/bin/bash
# جلب الصور المتبقية بالتتابع لتجنب 429
cd /home/z/my-project
mkdir -p scripts/imgjson

fetch_one() {
  local key=$1
  local query=$2
  if [ -s "scripts/imgjson/${key}.json" ]; then
    # تحقق أنه ليس ملف فاشل
    if python3 -c "import json,sys; d=json.load(open('scripts/imgjson/${key}.json')); sys.exit(0 if d.get('success') else 1)" 2>/dev/null; then
      echo "SKIP $key (already fetched)"
      return 0
    fi
  fi
  for attempt in 1 2 3; do
    echo "Fetching $key (attempt $attempt)..."
    if z-ai image-search -q "$query" --count 3 --no-rank --gl us -o "scripts/imgjson/${key}.json" >/dev/null 2>&1; then
      if python3 -c "import json,sys; d=json.load(open('scripts/imgjson/${key}.json')); sys.exit(0 if d.get('success') else 1)" 2>/dev/null; then
        echo "OK $key"
        return 0
      fi
    fi
    sleep 8
  done
  echo "FAIL $key"
}

fetch_one kebab "grilled iraqi kebab skewers plate with rice"
sleep 3
fetch_one broast "crispy fried chicken broast meal with fries"
sleep 3
fetch_one pizza "pizza margherita fresh from oven"
sleep 3
fetch_one burger "juicy cheeseburger with fries"
sleep 3
fetch_one fish "grilled whole fish masgouf middle eastern"
sleep 3
fetch_one vegetables "fresh vegetables market stall colorful"
sleep 3
fetch_one sweets "middle eastern sweets baklava kunafa dessert"
sleep 3
fetch_one icecream "ice cream sundae dessert cup"
sleep 3
fetch_one coffee "iced coffee latte cup cafe"
sleep 3
fetch_one juice "fresh orange juice glass"
sleep 3
fetch_one grill "mixed grill platter bbq meat"
sleep 3
fetch_one grocery "grocery store fresh fruits display"

echo "===== SUMMARY ====="
for f in scripts/imgjson/*.json; do
  key=$(basename "$f" .json)
  python3 -c "
import json
d=json.load(open('$f'))
if d.get('success'):
    urls=' '.join(r['original_url'] for r in d.get('results',[])[:3])
    print('$key|'+urls)
else:
    print('$key|FAILED')
" 2>/dev/null
done
