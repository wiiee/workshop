package com.workshop.domain.entity.project;

import com.workshop.domain.constant.Phase;

import java.time.LocalDateTime;

public class PhaseItem {
    public Phase phase;
    public LocalDateTime dateTime;

    public PhaseItem(Phase phase, LocalDateTime dateTime) {
        this.phase = phase;
        this.dateTime = dateTime;
    }
}
