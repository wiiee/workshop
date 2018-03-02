package com.workshop.domain.entity.project;

import com.workshop.domain.constant.Phase;

import java.time.LocalDateTime;

public class PhaseItem {
    public Phase phase;
    //谁拖动的
    public String userId;
    public LocalDateTime dateTime;

    public PhaseItem() {

    }

    public PhaseItem(Phase phase, String userId, LocalDateTime dateTime) {
        this.phase = phase;
        this.userId = userId;
        this.dateTime = dateTime;
    }
}
