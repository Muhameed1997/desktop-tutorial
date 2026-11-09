#!/bin/bash
# جلب صور حقيقية للمطاعم والأطباق والمتاجر
cd /home/z/my-project
mkdir -p scripts/imgjson

declare -A QUERIES=(
  ["kebab"]="grilled iraqi kebab skewers plate with rice"
  ["broast"]="crispy fried chicken broast meal with fries"
  ["shawarma"]="shawarma sandwich wrap arabic street food"
  ["pizza"]="pizza margherita fresh from oven"
  ["burger"]="juicy cheeseburger with fries"
  ["fish"]="grilled whole fish masgouf middle eastern"
  ["market"]="supermarket grocery store shelves interior"
  ["vegetables"]="fresh vegetables market stall colorful"
  ["sweets"]="middle eastern sweets baklava kunafa dessert"
  ["icecream"]="ice cream sundae dessert cup"
  ["coffee"]="iced coffee latte cup cafe"
  ["juice"]="fresh orange juice glass"
  ["grill"]="mixed grill platter bbq meat"
  ["grocery"]="grocery store fresh fruits display"
)

for key in "${!QUERIES[@]}"; do
  z-ai image-search -q "${QUERIES[$key]}" --count 3 --no-rank --gl us -o "scripts/imgjson/${key}.json" &
done
wait
echo "DONE"
for f in scripts/imgjson/*.json; do
  echo "=== $f ==="
  python3 -c "
import json
d=json.load(open('$f'))
if d.get('success'):
    for r in d.get('results',[])[:3]:
        print(r['original_url'])
else:
    print('FAILED:', d.get('error'))
"
done
