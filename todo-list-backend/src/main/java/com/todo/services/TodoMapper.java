package com.todo.services;

import com.todo.model.dtos.TodoDto;
import com.todo.model.entities.Todo;
import com.todo.model.enums.PriorityEnum;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TodoMapper {

    public TodoDto toTodoDto(Todo todoEntity) {
        return new TodoDto(todoEntity.getId(), todoEntity.getTask(), PriorityEnum.getPriorityEnum(todoEntity.getPriority()));
    }

    public List<TodoDto> toTodoDtoList(List<Todo> todoEntityList) {

        return todoEntityList.stream()
                .map(this::toTodoDto)
                .collect(Collectors.toList());
    }
}
