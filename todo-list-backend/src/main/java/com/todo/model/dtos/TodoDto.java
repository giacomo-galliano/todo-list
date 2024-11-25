package com.todo.model.dtos;

import com.todo.model.enums.PriorityEnum;

public class TodoDto {

    private int id;
    private String task;
    private PriorityEnum priority;

    public TodoDto() {
    }

    public TodoDto(int id, String task, PriorityEnum priority) {
        this.id = id;
        this.task = task;
        this.priority = priority;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public PriorityEnum getPriority() {
        return priority;
    }

    public void setPriority(PriorityEnum priority) {
        this.priority = priority;
    }
}
