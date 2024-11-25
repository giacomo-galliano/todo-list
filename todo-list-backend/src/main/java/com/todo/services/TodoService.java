package com.todo.services;

import com.todo.model.dtos.TodoDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TodoService {
    ResponseEntity<List<TodoDto>> getAllTodos();
    void deleteTodoItem(Integer key);
}
