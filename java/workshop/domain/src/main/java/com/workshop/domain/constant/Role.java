package com.workshop.domain.constant;

public enum Role {
    User(0),
    Leader(1),
    Manager(2);

    private int value;

    Role(int value) {
        this.value = value;
    }

    public int value() {
        return value;
    }
}
