import cron from 'node-cron';
import FollowUp from '../models/followup.model.js';
import Notification from '../models/notification.model.js';

export function startNotificationWorker() {
  // Every minute: create notifications for due followups that are still open
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    try {
      const due = await FollowUp.find({ followupDate: { $lte: now }, status: 'open' }).populate('assignedTo lead');
      for (const f of due) {
        await Notification.create({
          user: f.assignedTo,
          message: `Follow-up due for lead: ${f.lead?.name || f.lead}`,
          link: `/leads/${f.lead?._id || f.lead}`
        });
        // Optional: mark as skipped or keep open
      }
    } catch (e) {
      console.error('Notification worker error:', e.message);
    }
  });
}