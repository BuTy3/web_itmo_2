package ru.itmo.webserver.beans;

import jakarta.enterprise.context.ApplicationScoped;
import lombok.Setter;

import javax.management.*;

@ApplicationScoped
public class PointStat extends NotificationBroadcasterSupport implements PointStatMBean {

    private int totalPoints = 0;
    private int missedPoints = 0;
    private long sequenceNumber = 1;

    @Setter
    private ObjectName objectName;

    public synchronized void registerPoint(boolean hit) {
        totalPoints++;
        if (!hit) missedPoints++;

        System.out.println("\ntotalPoints = " + totalPoints + ", missed = " + missedPoints + "\n");

        if (totalPoints % 15 == 0) {
            Notification notification = new Notification(
                    "pointThresholdReached", objectName, sequenceNumber++,
                    System.currentTimeMillis(), "Количество точек кратно 15"
            );
            sendNotification(notification);
        }
    }

    @Override
    public synchronized int getTotalPoints() {
        return totalPoints;
    }

    @Override
    public synchronized int getMissedPoints() {
        return missedPoints;
    }

    @Override
    public MBeanNotificationInfo[] getNotificationInfo() {
        String[] types = new String[] { "pointThresholdReached" };
        String name = Notification.class.getName();
        String description = "Уведомление при достижении количества точек, кратного 15";
        return new MBeanNotificationInfo[] {
                new MBeanNotificationInfo(types, name, description)
        };
    }
}
