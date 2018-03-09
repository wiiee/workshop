package com.workshop.domain.entity.project;

import java.time.LocalDateTime;

public class PhaseItem {
    public String phase;
    //谁拖动的
    public String userId;
    public LocalDateTime dateTime;

    public PhaseItem() {

    }

    public PhaseItem(String phase, String userId, LocalDateTime dateTime) {
        this.phase = phase;
        this.userId = userId;
        this.dateTime = dateTime;
    }
}
