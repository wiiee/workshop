package com.workshop.domain.constant;

public enum Role {
    User(0),
    Leader(4),
    Manager(16),
    Admin(64);

    private int value;

    Role(int value) {
        this.value = value;
    }

    public int value() {
        return value;
    }
}
