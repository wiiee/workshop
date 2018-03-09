package com.workshop.domain.entity.user;

import com.workshop.domain.constant.Phase;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by billwang on 3/9/18
 */
public class TeamSetting {
    //对Task阶段的定义
    private List<String> phases;

    public List<String> getPhases() {
        if (CollectionUtils.isEmpty(phases)) {
            return Stream.of(Phase.values())
                    .map(Enum::name)
                    .collect(Collectors.toList());
        } else {
            return phases;
        }
    }

    //如果没有设置就设置默认的
    public void setPhases(List<String> phases) {
        this.phases = phases;
    }
}
