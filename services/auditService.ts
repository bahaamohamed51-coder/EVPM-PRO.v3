
import { User } from '../types';
import { OFFICIAL_LOGS_URL } from '../constants';

export const logAction = async (user: User | null, action: string, details: any = {}) => {
  if (!OFFICIAL_LOGS_URL) return; // لا يتم الإرسال إذا لم يتم وضع الرابط

  try {
    await fetch(OFFICIAL_LOGS_URL, {
      method: 'POST',
      mode: 'no-cors', // لتجنب مشاكل CORS مع Apps Script عند الإرسال فقط
      body: JSON.stringify({
        action: 'logActivity',
        timestamp: new Date().toISOString(),
        userId: user?.username || 'anonymous',
        userName: user?.name || 'Anonymous',
        userRole: user?.role || 'guest',
        activity: action,
        details: JSON.stringify(details)
      })
    });
  } catch (error) {
    console.error("Error logging to Google Sheets:", error);
  }
};
