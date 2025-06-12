package ru.itmo.webserver.beans;

public interface ClickIntervalMBean {
    long getAverageIntervalMillis();
    int getClickCount();
}
