package com.todo.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum PriorityEnum {
    ONE(1),
    TWO(2),
    THREE(3);

    private final int priority;

    private PriorityEnum(int priority) {
        this.priority = priority;
    }

    @JsonValue
    public int getPriority() {
        return priority;
    }

    @JsonCreator
    public static PriorityEnum getPriorityEnum(int priority) {
        for (PriorityEnum priorityEnum : PriorityEnum.values()) {
            if (priorityEnum.getPriority() == priority) {
                return priorityEnum;
            }
        }
        throw new IllegalArgumentException("Invalid priority : " + priority);
    }
}
