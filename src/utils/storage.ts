import { BusinessPlan } from '../types/plan';
import { SAMPLE_PRESETS } from '../data/samplePresets';

const STORAGE_KEY = 'sme_planmaster_active_plan_v1';

export function loadCurrentPlan(): BusinessPlan {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.companyName && parsed.financials) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load saved plan, using default preset:', err);
  }

  // Fallback default: F&B Bistro preset
  return JSON.parse(JSON.stringify(SAMPLE_PRESETS[0].data));
}

export function saveCurrentPlan(plan: BusinessPlan): void {
  try {
    const toSave = {
      ...plan,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.error('Failed to save plan to localStorage:', err);
  }
}

export function exportPlanToJson(plan: BusinessPlan): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(plan, null, 2));
  const downloadAnchor = document.createElement('a');
  const filename = `Ke_Hoach_Kinh_Doanh_${plan.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${plan.planningYear}.json`;
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseImportedJson(jsonString: string): BusinessPlan | null {
  try {
    const parsed = JSON.parse(jsonString);
    if (
      parsed &&
      typeof parsed.companyName === 'string' &&
      parsed.smartGoals &&
      parsed.swotItems &&
      parsed.marketing4P &&
      parsed.actionItems &&
      parsed.financials
    ) {
      return parsed as BusinessPlan;
    }
  } catch (err) {
    console.error('Invalid JSON structure:', err);
  }
  return null;
}
