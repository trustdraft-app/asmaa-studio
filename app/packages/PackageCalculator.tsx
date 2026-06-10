"use client";

import { useMemo, useState } from "react";
import { whatsappLink } from "../../lib/content";

type Addon = { id: string; ar: string; en: string; price: number };

const ADDONS: Addon[] = [
  { id: "extra-hour", ar: "ساعة إضافية", en: "Extra hour", price: 200 },
  { id: "mannequin", ar: "تصوير الفستان بمنيكان", en: "Dress on mannequin", price: 150 },
  { id: "color-grade", ar: "تلوين سينمائي + تنعيم بشرة", en: "Cinematic color + skin softening", price: 350 }
];

const PACKAGE_PRICES: Record<string, { ar: string; price: number }> = {
  "01": { ar: "بكج الزفة", price: 600 },
  "02": { ar: "بكج الزفة والكواليس", price: 1200 },
  "03": { ar: "Half Day", price: 1700 },
  "04": { ar: "Full Day", price: 2500 },
  "05": { ar: "بكج الخطوبة", price: 1500 }
};

export default function PackageCalculator() {
  const [pkg, setPkg] = useState<string>("03");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [extraHours, setExtraHours] = useState<number>(0);

  const total = useMemo(() => {
    let sum = PACKAGE_PRICES[pkg].price;
    for (const id of selected) {
      const addon = ADDONS.find((a) => a.id === id);
      if (!addon) continue;
      sum += id === "extra-hour" ? addon.price * extraHours : addon.price;
    }
    return sum;
  }, [pkg, selected, extraHours]);

  const waMessage = useMemo(() => {
    const lines: string[] = [];
    lines.push(`أرغب في حجز ${PACKAGE_PRICES[pkg].ar} (${PACKAGE_PRICES[pkg].price} ريال).`);
    if (selected.size > 0) {
      lines.push("الإضافات:");
      for (const id of selected) {
        const addon = ADDONS.find((a) => a.id === id);
        if (!addon) continue;
        if (id === "extra-hour" && extraHours > 0) {
          lines.push(`• ${addon.ar} × ${extraHours} = ${addon.price * extraHours} ريال`);
        } else if (id !== "extra-hour") {
          lines.push(`• ${addon.ar} = ${addon.price} ريال`);
        }
      }
      lines.push(`الإجمالي التقديري: ${total} ريال`);
    }
    return lines.join("\n");
  }, [pkg, selected, extraHours, total]);

  const waUrl = `${whatsappLink("calculator")}%0A%0A${encodeURIComponent(waMessage)}`;

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    if (id === "extra-hour" && !next.has("extra-hour")) setExtraHours(0);
    if (id === "extra-hour" && next.has("extra-hour") && extraHours === 0) setExtraHours(1);
  }

  return (
    <div className="calc">
      <div className="calc-row">
        <label className="calc-label" htmlFor="pkg-select">اختاري الباقة</label>
        <select
          id="pkg-select"
          className="calc-select"
          value={pkg}
          onChange={(e) => setPkg(e.target.value)}
        >
          {Object.entries(PACKAGE_PRICES).map(([id, { ar, price }]) => (
            <option key={id} value={id}>{ar} — {price} ريال</option>
          ))}
        </select>
      </div>

      <fieldset className="calc-addons">
        <legend>إضافات اختيارية</legend>
        {ADDONS.map((addon) => {
          const checked = selected.has(addon.id);
          return (
            <label key={addon.id} className={`calc-addon ${checked ? "is-checked" : ""}`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(addon.id)}
              />
              <span className="calc-addon-name">{addon.ar}</span>
              <span className="calc-addon-price">
                {addon.id === "extra-hour" ? `${addon.price} ريال / ساعة` : `${addon.price} ريال`}
              </span>
            </label>
          );
        })}
        {selected.has("extra-hour") ? (
          <div className="calc-hour-stepper">
            <span>عدد الساعات الإضافية</span>
            <button
              type="button"
              aria-label="إنقاص ساعة"
              onClick={() => setExtraHours((h) => Math.max(1, h - 1))}
            >−</button>
            <strong>{extraHours}</strong>
            <button
              type="button"
              aria-label="إضافة ساعة"
              onClick={() => setExtraHours((h) => Math.min(6, h + 1))}
            >+</button>
          </div>
        ) : null}
      </fieldset>

      <div className="calc-total">
        <span>الإجمالي التقديري</span>
        <b>{total.toLocaleString("ar-SA")} ريال</b>
      </div>

      <a className="calc-cta cta" href={waUrl} target="_blank" rel="noreferrer">
        أرسلي طلبك عبر واتساب
      </a>
      <p className="calc-note">
        السعر النهائي يُؤكَّد بعد مراجعة التاريخ والمدينة عبر واتساب. لا حقول إلزامية، لا تسجيل دخول.
      </p>
    </div>
  );
}
