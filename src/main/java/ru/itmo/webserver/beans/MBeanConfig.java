package ru.itmo.webserver.beans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import javax.management.MBeanServer;
import javax.management.ObjectName;
import java.lang.management.ManagementFactory;

@ApplicationScoped
public class MBeanConfig {

    @Inject
    private PointStat pointStat;

    @Inject
    private ClickInterval clickInterval;

    private ObjectName pointsName;
    private ObjectName clickName;

    public void registerMBeans() {
        try {
            MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();

            pointsName = new ObjectName("ru.itmo.webserver:type=PointsMonitoring");
            clickName = new ObjectName("ru.itmo.webserver:type=ClickTiming");

            if (!mbs.isRegistered(pointsName)) {
                mbs.registerMBean(pointStat, pointsName);
            }

            if (!mbs.isRegistered(clickName)) {
                mbs.registerMBean(clickInterval, clickName);
            }

            System.out.println("MBeans зарегистрированы через MBeanConfig");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void unregisterMBeans() {
        try {
            MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();
            if (pointsName != null && mbs.isRegistered(pointsName)) {
                mbs.unregisterMBean(pointsName);
            }
            if (clickName != null && mbs.isRegistered(clickName)) {
                mbs.unregisterMBean(clickName);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
