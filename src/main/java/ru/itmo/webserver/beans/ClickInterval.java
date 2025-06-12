package ru.itmo.webserver.beans;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ClickInterval implements ClickIntervalMBean {
    private long lastTimestamp = -1;
    private long totalInterval = 0;
    private int count = 0;
    private long lastClickTime = 0;

    public void registerClick(long timestamp) {
        if (lastClickTime != 0) {
            long interval = timestamp - lastClickTime;
            if (interval <= 15_000) {
                totalInterval += interval;
                count++;
            } else {
                totalInterval = 0;
                count = 0;
                System.out.println("Сброс");
            }
        }
        lastClickTime = timestamp;
    }

    @Override
    public synchronized long getAverageIntervalMillis() {
        return count == 0 ? 0 : totalInterval / count;
    }

    @Override
    public synchronized int getClickCount() {
        return count;
    }
}
