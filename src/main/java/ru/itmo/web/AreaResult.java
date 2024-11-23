package ru.itmo.web;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@RequiredArgsConstructor
public class AreaResult {
    private final double x;
    private final double y;
    private final double r;
    private final boolean isInside;

    public boolean getIsInside() {
        return isInside;
    }
}
