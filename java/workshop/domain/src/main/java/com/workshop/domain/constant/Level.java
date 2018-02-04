package com.workshop.domain.constant;

public enum Level {
    T10(10),
    T11(11),
    T12(12),
    T13(13),
    T14(14),
    T15(15),
    T16(16),
    T17(17),
    T18(18),
    T19(19),
    T20(20);

    private int value;

    Level(int value) {
        this.value = value;
    }

    public int value() {
        return value;
    }
}
